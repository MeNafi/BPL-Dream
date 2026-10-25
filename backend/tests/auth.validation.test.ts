import test from "node:test";
import assert from "node:assert/strict";
import { loginSchema, signupSchema } from "../src/modules/auth/auth.validation";
import {
  createSubmissionSchema,
  parseGithubRepo,
  reviewSchema,
} from "../src/modules/submissions/submission.validation";

test("signup rejects short passwords", () => {
  assert.equal(
    signupSchema.safeParse({ name: "Ada", email: "a@b.co", password: "short" }).success,
    false,
  );
});

test("login requires email", () => {
  assert.equal(loginSchema.safeParse({ email: "nope", password: "x" }).success, false);
});

test("github normalization", () => {
  const repo = parseGithubRepo("https://www.github.com/Acme/Widget.git");
  assert.equal(repo.ok, true);
  if (repo.ok) assert.equal(repo.key, "github.com/acme/widget");
});

test("submission rejects non-github", () => {
  const result = createSubmissionSchema.safeParse({
    projectName: "Test",
    repoUrl: "https://gitlab.com/a/b",
    liveUrl: "https://demo.example.com",
    description: "This description is long enough to pass validation rules.",
  });
  assert.equal(result.success, false);
});

test("rejection requires feedback", () => {
  assert.equal(reviewSchema.safeParse({ decision: "REJECTED", feedback: "short" }).success, false);
  assert.equal(
    reviewSchema.safeParse({
      decision: "REJECTED",
      feedback: "Needs a longer, clearer reason.",
    }).success,
    true,
  );
});
