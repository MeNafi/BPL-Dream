import type { NextFunction, Request, RequestHandler, Response } from "express";

export const catchAsync = (fn: RequestHandler): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
