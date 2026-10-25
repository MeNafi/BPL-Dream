import { z } from "zod";

function parseGithubRepo(input: string) {
  let parsed: URL;
  try {
    parsed = new URL(input.trim());
  } catch {
    return { ok: false as const, message: "A valid GitHub repository URL is required" };
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    return { ok: false as const, message: "Repository URL must start with http or https" };
  }
  const host = parsed.hostname.toLowerCase().replace(/^www\./, "");
  if (host !== "github.com") {
    return { ok: false as const, message: "Use a github.com repository URL" };
  }
  const parts = parsed.pathname.split("/").filter(Boolean).map((p) => p.replace(/\.git$/i, ""));
  if (parts.length < 2) {
    return {
      ok: false as const,
      message: "Include the owner and repository, like https://github.com/owner/repo",
    };
  }
  const owner = parts[0]!;
  const repo = parts[1]!;
  return {
    ok: true as const,
    url: `https://github.com/${owner}/${repo}`,
    key: `github.com/${owner.toLowerCase()}/${repo.toLowerCase()}`,
  };
}

function parseLiveUrl(input: string) {
  let parsed: URL;
  try {
    parsed = new URL(input.trim());
  } catch {
    return { ok: false as const, message: "A valid live demo URL is required" };
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    return { ok: false as const, message: "Live demo URL must start with http or https" };
  }
  parsed.hash = "";
  return { ok: true as const, url: parsed.toString() };
}

export const createSubmissionSchema = z
  .object({
    projectName: z.string().trim().min(2).max(120),
    repoUrl: z.string().trim().min(1),
    liveUrl: z.string().trim().min(1),
    description: z.string().trim().min(20).max(2000),
  })
  .superRefine((value, ctx) => {
    const repo = parseGithubRepo(value.repoUrl);
    if (!repo.ok) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["repoUrl"], message: repo.message });
    }
    const live = parseLiveUrl(value.liveUrl);
    if (!live.ok) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["liveUrl"], message: live.message });
    }
  });

export const reviewSchema = z
  .object({
    decision: z.enum(["APPROVED", "REJECTED"]),
    feedback: z.string().trim().max(2000).optional(),
  })
  .superRefine((value, ctx) => {
    if (value.decision === "REJECTED" && (value.feedback?.trim().length ?? 0) < 12) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["feedback"],
        message: "Rejection needs a reason of at least 12 characters",
      });
    }
  });

export const listQuerySchema = z.object({
  status: z.enum(["ALL", "PENDING", "APPROVED", "REJECTED"]).optional().default("ALL"),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(50).optional().default(10),
  q: z.string().optional().default(""),
  sortBy: z
    .enum(["submittedAt", "projectName", "status", "studentName"])
    .optional()
    .default("submittedAt"),
  order: z.enum(["asc", "desc"]).optional().default("desc"),
});

export const idParamSchema = z.object({
  id: z.string().uuid(),
});

export { parseGithubRepo, parseLiveUrl };
