import { Router } from "express";
import { Role } from "@prisma/client";
import { auth } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { authRateLimiter } from "../../middlewares/rate-limit.middleware.js";
import { authController } from "./auth.controller.js";
import { loginSchema, signupSchema } from "./auth.validation.js";

const router = Router();

router.post("/signup", authRateLimiter, validate({ body: signupSchema }), authController.signup);
router.post("/login", authRateLimiter, validate({ body: loginSchema }), authController.login);
router.post("/logout", authController.logout);
router.get("/me", auth(), authController.me);

export const authRoutes = router;
