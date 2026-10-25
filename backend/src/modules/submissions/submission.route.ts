import { Router } from "express";
import { Role } from "@prisma/client";
import { auth } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { submissionRateLimiter } from "../../middlewares/rate-limit.middleware.js";
import { submissionController } from "./submission.controller.js";
import {
  createSubmissionSchema,
  idParamSchema,
  listQuerySchema,
  reviewSchema,
} from "./submission.validation.js";

const studentRouter = Router();
studentRouter.use(auth(Role.STUDENT));
studentRouter.post(
  "/",
  submissionRateLimiter,
  validate({ body: createSubmissionSchema }),
  submissionController.create,
);
studentRouter.get("/my", validate({ query: listQuerySchema }), submissionController.listMine);
studentRouter.get("/:id", validate({ params: idParamSchema }), submissionController.getMine);

const adminRouter = Router();
adminRouter.use(auth(Role.ADMIN));
adminRouter.get("/stats", submissionController.stats);
adminRouter.get("/", validate({ query: listQuerySchema }), submissionController.listAdmin);
adminRouter.get("/:id", validate({ params: idParamSchema }), submissionController.getAdmin);
adminRouter.patch(
  "/:id/review",
  validate({ params: idParamSchema, body: reviewSchema }),
  submissionController.review,
);

export const submissionRoutes = studentRouter;
export const adminSubmissionRoutes = adminRouter;
