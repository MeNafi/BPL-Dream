import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { submissionService } from "./submission.service.js";

export const submissionController = {
  create: catchAsync(async (req: Request, res: Response) => {
    const data = await submissionService.create(req.user!.id, req.body);
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Submission created successfully",
      data: { id: data.id, status: data.status },
    });
  }),

  listMine: catchAsync(async (req: Request, res: Response) => {
    const result = await submissionService.listMine(req.user!.id, req.query as never);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Submissions loaded",
      data: result.data,
      meta: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  }),

  getMine: catchAsync(async (req: Request, res: Response) => {
    const data = await submissionService.getMine(req.user!.id, req.params.id as string);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Submission loaded",
      data,
    });
  }),

  listAdmin: catchAsync(async (req: Request, res: Response) => {
    const result = await submissionService.listAdmin(req.query as never);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Submissions loaded",
      data: result.data,
      meta: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  }),

  stats: catchAsync(async (_req: Request, res: Response) => {
    const data = await submissionService.stats();
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Statistics loaded",
      data,
    });
  }),

  getAdmin: catchAsync(async (req: Request, res: Response) => {
    const data = await submissionService.getAdmin(req.params.id as string);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Submission loaded",
      data,
    });
  }),

  review: catchAsync(async (req: Request, res: Response) => {
    const data = await submissionService.review(req.user!.id, req.params.id as string, req.body);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Submission reviewed",
      data,
    });
  }),
};
