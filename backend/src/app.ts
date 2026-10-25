import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { config } from "./config/index.js";
import { authRoutes } from "./modules/auth/auth.route.js";
import {
  adminSubmissionRoutes,
  submissionRoutes,
} from "./modules/submissions/submission.route.js";
import { globalErrorHandler, notFound } from "./middlewares/error.middleware.js";
import { openApiDocument } from "./docs/openapi.js";

const app = express();

app.use(helmet());
app.use(
cors({
    origin: [
      'http://localhost:3000',
      'https://submity-client.vercel.app' // frontend deployment URL
    ],
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health", (_req, res) => {
  res.json({ success: true, message: "ok" });
});

app.get("/api/openapi.json", (_req, res) => {
  res.json(openApiDocument);
});
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.use("/api/auth", authRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/admin/submissions", adminSubmissionRoutes);

app.use(notFound);
app.use(globalErrorHandler);

export default app;
