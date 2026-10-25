import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { authService } from "./auth.service.js";
import { config } from "../../config/index.js";

const cookieOptions = {
  httpOnly: true,
  secure: config.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export const authController = {
  signup: catchAsync(async (req: Request, res: Response) => {
    const result = await authService.signup(req.body);
    res.cookie("accessToken", result.accessToken, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.cookie("refreshToken", result.refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Account created successfully",
      data: {
        user: result.user,
        accessToken: result.accessToken,
      },
    });
  }),

  login: catchAsync(async (req: Request, res: Response) => {
    const result = await authService.login(req.body);
    res.cookie("accessToken", result.accessToken, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.cookie("refreshToken", result.refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Signed in successfully",
      data: {
        user: result.user,
        accessToken: result.accessToken,
      },
    });
  }),

  logout: catchAsync(async (_req: Request, res: Response) => {
    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Signed out",
      data: null,
    });
  }),

  me: catchAsync(async (req: Request, res: Response) => {
    const user = await authService.me(req.user!.id);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Profile loaded",
      data: user,
    });
  }),
};
