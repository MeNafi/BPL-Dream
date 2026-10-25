import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";
import { AppError } from "../utils/AppError.js";

type Targets = {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
};

export const validate = (schemas: Targets) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const details: { field: string; message: string }[] = [];

    for (const key of ["body", "query", "params"] as const) {
      const schema = schemas[key];
      if (!schema) continue;
      const result = schema.safeParse(req[key]);
      if (!result.success) {
        for (const issue of result.error.issues) {
          details.push({
            field: issue.path.join(".") || key,
            message: issue.message,
          });
        }
      } else {
       (req as unknown as Record<string, unknown>)[key] = result.data;
      }
    }

    if (details.length) {
      return next(new AppError(422, "Validation failed", details));
    }
    next();
  };
};
