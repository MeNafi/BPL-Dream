import type { NextFunction, Request, Response } from "express";
import { Role } from "@prisma/client";
import { prisma }  from "../utils/prisma.js";
import { jwtUtils } from "../utils/jwt.js";
import { AppError } from "../utils/AppError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const auth = (...roles: Role[]) =>
  catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    const bearer =
      header?.startsWith("Bearer ") ? header.slice(7) : header ?? undefined;
    const cookieToken = req.cookies?.accessToken as string | undefined;
    const token = bearer || cookieToken;

    if (!token) throw new AppError(401, "You are not logged in");

    const verified = jwtUtils.verifyAccessToken(token);
    if (!verified.success) throw new AppError(401, "Session expired or invalid");

    const user = await prisma.user.findUnique({
      where: { id: verified.data.id },
      select: { id: true, email: true, name: true, role: true },
    });
    if (!user) throw new AppError(401, "User not found");

    if (roles.length && !roles.includes(user.role)) {
      throw new AppError(403, "Forbidden");
    }

    req.user = user;
    next();
  });
