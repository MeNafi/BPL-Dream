import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";
import { config } from "../../config/index.js";
import { prisma }  from "../../utils/prisma.js";
import { jwtUtils } from "../../utils/jwt.js";
import { AppError } from "../../utils/AppError.js";
import type { z } from "zod";
import type { loginSchema, signupSchema } from "./auth.validation.js";

export const authService = {
  async signup(input: z.infer<typeof signupSchema>) {
    const existing = await prisma.user.findUnique({ where: { email: input.email } });
    if (existing) {
      throw new AppError(409, "An account with this email already exists", [
        { field: "email", message: "An account with this email already exists" },
      ]);
    }

    const passwordHash = await bcrypt.hash(input.password, config.BCRYPT_SALT_ROUNDS);
    const user = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        passwordHash,
        role: Role.STUDENT,
      },
      select: { id: true, name: true, email: true, role: true },
    });

    const tokens = issueTokens(user);
    return { user, ...tokens };
  },

  async login(input: z.infer<typeof loginSchema>) {
    const user = await prisma.user.findUnique({ where: { email: input.email } });
    if (!user) throw new AppError(401, "Email or password is incorrect");

    const match = await bcrypt.compare(input.password, user.passwordHash);
    if (!match) throw new AppError(401, "Email or password is incorrect");

    const safe = { id: user.id, name: user.name, email: user.email, role: user.role };
    const tokens = issueTokens(safe);
    return { user: safe, ...tokens };
  },

  async me(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
    if (!user) throw new AppError(401, "User not found");
    return user;
  },
};

function issueTokens(user: { id: string; name: string; email: string; role: Role }) {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  return {
    accessToken: jwtUtils.createAccessToken(payload),
    refreshToken: jwtUtils.createRefreshToken(payload),
  };
}
