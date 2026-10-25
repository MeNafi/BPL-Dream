import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";
import { config } from "../config/index.js";

export type TokenPayload = {
  id: string;
  email: string;
  name: string;
  role: "STUDENT" | "ADMIN";
};

export const jwtUtils = {
  createAccessToken(payload: TokenPayload) {
    return jwt.sign(payload, config.JWT_ACCESS_SECRET, {
      expiresIn: config.JWT_ACCESS_EXPIRES_IN,
    } as SignOptions);
  },
  createRefreshToken(payload: TokenPayload) {
    return jwt.sign(payload, config.JWT_REFRESH_SECRET, {
      expiresIn: config.JWT_REFRESH_EXPIRES_IN,
    } as SignOptions);
  },
  verifyAccessToken(token: string) {
    try {
      const data = jwt.verify(token, config.JWT_ACCESS_SECRET) as JwtPayload & TokenPayload;
      return { success: true as const, data };
    } catch (error) {
      return {
        success: false as const,
        error: error instanceof Error ? error.message : "Invalid token",
      };
    }
  },
  verifyRefreshToken(token: string) {
    try {
      const data = jwt.verify(token, config.JWT_REFRESH_SECRET) as JwtPayload & TokenPayload;
      return { success: true as const, data };
    } catch (error) {
      return {
        success: false as const,
        error: error instanceof Error ? error.message : "Invalid token",
      };
    }
  },
};
