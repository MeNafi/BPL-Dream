import type { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { AppError } from "../utils/AppError.js";
import { config } from "../config/index.js";

export const notFound = (_req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(404, "Route not found"));
};

export const globalErrorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errorDetails: err.errorDetails,
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "A record with that value already exists",
      });
    }
  }

  console.error(err);
  return res.status(500).json({
    success: false,
    message:
      config.NODE_ENV === "production"
        ? "Internal server error"
        : err instanceof Error
          ? err.message
          : "Internal server error",
  });
};
