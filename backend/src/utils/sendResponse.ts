import type { Response } from "express";

type Meta = { page: number; limit: number; total: number; totalPages: number };

type Payload<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  meta?: Meta;
  errorDetails?: { field: string; message: string }[];
};

export const sendResponse = <T>(res: Response, payload: Payload<T>) => {
  res.status(payload.statusCode).json({
    success: payload.success,
    message: payload.message,
    data: payload.data,
    meta: payload.meta,
    errorDetails: payload.errorDetails,
  });
};
