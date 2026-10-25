import { Prisma, Role, SubmissionStatus } from "@prisma/client";
import { prisma } from "../../utils/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { parseGithubRepo, parseLiveUrl } from "./submission.validation.js";
import type { z } from "zod";
import type { createSubmissionSchema, listQuerySchema, reviewSchema } from "./submission.validation.js";

const submissionInclude = {
  student: { select: { id: true, name: true, email: true } },
  reviewer: { select: { id: true, name: true, email: true } },
} satisfies Prisma.SubmissionInclude;

export const submissionService = {
  async create(studentId: string, input: z.infer<typeof createSubmissionSchema>) {
    const user = await prisma.user.findUnique({ where: { id: studentId } });
    if (!user || user.role !== Role.STUDENT) {
      throw new AppError(403, "Only students can submit projects");
    }

    const repo = parseGithubRepo(input.repoUrl);
    const live = parseLiveUrl(input.liveUrl);
    if (!repo.ok || !live.ok) throw new AppError(422, "Validation failed");

    const active = await prisma.submission.findFirst({
      where: {
        studentId,
        repoKey: repo.key,
        status: { in: [SubmissionStatus.PENDING, SubmissionStatus.APPROVED] },
      },
    });
    if (active) {
      throw new AppError(409, "You already have an active submission for this repository.", [
        {
          field: "repoUrl",
          message: "This repository already has a pending or approved submission.",
        },
      ]);
    }

    const submission = await prisma.submission.create({
      data: {
        projectName: input.projectName,
        repoUrl: repo.url,
        repoKey: repo.key,
        liveUrl: live.url,
        description: input.description,
        studentId,
        status: SubmissionStatus.PENDING,
      },
      include: submissionInclude,
    });

    return submission;
  },

  async listMine(studentId: string, query: z.infer<typeof listQuerySchema>) {
    const where: Prisma.SubmissionWhereInput = { studentId };
    if (query.status !== "ALL") where.status = query.status;

    const total = await prisma.submission.count({ where });
    const data = await prisma.submission.findMany({
      where,
      include: submissionInclude,
      orderBy: { submittedAt: query.order },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    return {
      data,
      page: query.page,
      limit: query.limit,
      total,
      totalPages: total === 0 ? 0 : Math.ceil(total / query.limit),
    };
  },

  async getMine(studentId: string, id: string) {
    const submission = await prisma.submission.findFirst({
      where: { id, studentId },
      include: submissionInclude,
    });
    if (!submission) throw new AppError(404, "Submission not found");
    return submission;
  },

  async listAdmin(query: z.infer<typeof listQuerySchema>) {
    const where: Prisma.SubmissionWhereInput = {};
    if (query.status !== "ALL") where.status = query.status;
    if (query.q?.trim()) {
      const q = query.q.trim();
      where.OR = [
        { projectName: { contains: q, mode: "insensitive" } },
        { student: { name: { contains: q, mode: "insensitive" } } },
        { student: { email: { contains: q, mode: "insensitive" } } },
      ];
    }

    const sortMap = {
      submittedAt: { submittedAt: query.order },
      projectName: { projectName: query.order },
      status: { status: query.order },
      studentName: { student: { name: query.order } },
    } as const;

    const total = await prisma.submission.count({ where });
    const data = await prisma.submission.findMany({
      where,
      include: submissionInclude,
      orderBy: sortMap[query.sortBy],
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    return {
      data,
      page: query.page,
      limit: query.limit,
      total,
      totalPages: total === 0 ? 0 : Math.ceil(total / query.limit),
    };
  },

  async stats() {
    const [total, pending, approved, rejected] = await Promise.all([
      prisma.submission.count(),
      prisma.submission.count({ where: { status: SubmissionStatus.PENDING } }),
      prisma.submission.count({ where: { status: SubmissionStatus.APPROVED } }),
      prisma.submission.count({ where: { status: SubmissionStatus.REJECTED } }),
    ]);
    return { total, pending, approved, rejected };
  },

  async getAdmin(id: string) {
    const submission = await prisma.submission.findUnique({
      where: { id },
      include: submissionInclude,
    });
    if (!submission) throw new AppError(404, "Submission not found");
    return submission;
  },

  async review(adminId: string, id: string, input: z.infer<typeof reviewSchema>) {
    const current = await prisma.submission.findUnique({ where: { id } });
    if (!current) throw new AppError(404, "Submission not found");
    if (current.status !== SubmissionStatus.PENDING) {
      throw new AppError(409, "Only pending submissions can be reviewed. This decision is final.");
    }

    const feedback =
      input.feedback?.trim() ||
      (input.decision === "REJECTED" ? undefined : null);

    if (input.decision === "REJECTED" && (!feedback || feedback.length < 12)) {
      throw new AppError(422, "Validation failed", [
        { field: "feedback", message: "Rejection needs a reason of at least 12 characters" },
      ]);
    }

    return prisma.submission.update({
      where: { id },
      data: {
        status: input.decision,
        reviewFeedback: feedback ?? null,
        reviewerId: adminId,
        reviewedAt: new Date(),
      },
      include: submissionInclude,
    });
  },
};
