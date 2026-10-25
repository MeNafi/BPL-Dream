"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  GraduationCap,
  Users,
} from "lucide-react";
import type { UserRole } from "@/lib/api-client";
import { homeFor, useAuth } from "./auth-provider";
import { DemoAccess } from "./demo-access";
import { LogoLink, Logo } from "./logo";
import { useNotify } from "./toast-provider";

export function AuthPage({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const notify = useNotify();
  const { user, ready, login, signup } = useAuth();
  
  // State management for user role, form fields, visibility, loading, and errors
  const [role, setRole] = useState<UserRole>("student");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isLogin = mode === "login";

  // Redirect to respective workspace if the user is already authenticated
  useEffect(() => {
    if (ready && user) router.replace(homeFor(user));
  }, [ready, user, router]);

  // Handle generic input changes for form fields
  const update =
    (key: keyof typeof form) => (event: ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form, [key]: event.target.value });

  // Handle form submission for both login and signup flows
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (!isLogin && !form.name.trim())
      return setError("Please enter your full name.");
    if (!isLogin && form.password !== form.confirm)
      return setError("Passwords do not match.");
    setLoading(true);
    try {
      const next = isLogin
        ? await login(form.email, form.password)
        : await signup({
            name: form.name.trim(),
            email: form.email,
            password: form.password,
            role,
          });
      notify({
        message: isLogin ? "Welcome back." : "Your workspace is ready.",
      });
      router.push(homeFor(next));
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to connect right now.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      {/* Left side decorative art and branding section */}
      <div className="auth-art">
        <LogoLink />
        <div className="auth-art-copy">
          <span className="eyebrow light-eyebrow">
            The review workspace for real progress
          </span>
          <h1>
            Make good work
            <br />
            <em>easier to see.</em>
          </h1>
          <p>
            One focused place for submissions, decisions, and feedback that
            helps people grow.
          </p>
        </div>
        <div className="auth-quote">
          <div className="quote-mark">“</div>
          <p>Submity gives every project a clear next step.</p>
          <span>— The Submity team</span>
        </div>
      </div>

      {/* Right side authentication panel */}
      <div className="auth-panel">
        <Link className="back-link" href="/">
          <ArrowRight size={15} className="rotate-back" /> Back to home
        </Link>
        <div className="auth-form-wrap">
          {/* Form header description */}
          <div className="auth-heading">
            <span className="mobile-only">
              <Logo />
            </span>
            <div className="eyebrow">Welcome to Submity</div>
            <h2>{isLogin ? "Welcome back." : "Start with your best work."}</h2>
            <p>
              {isLogin
                ? "Log in to continue where you left off."
                : "Create your workspace in less than a minute."}
            </p>
          </div>

          {/* Main authentication form */}
          <form onSubmit={submit} className="auth-form">
            {/* Signup specific inputs: Full name and Role selection */}
            {!isLogin && (
              <>
                <label>
                  Full name
                  <input
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Alex Morgan"
                    autoComplete="name"
                    required
                  />
                </label>
                <div className="role-label">
                  I am joining as <span>Choose your workspace</span>
                </div>
                <div className="role-options">
                  <button
                    type="button"
                    className={
                      role === "student"
                        ? "role-option selected"
                        : "role-option"
                    }
                    onClick={() => setRole("student")}
                  >
                    <GraduationCap size={19} />
                    <span>
                      <strong>Student</strong>
                      <small>Submit and track projects</small>
                    </span>
                    {role === "student" && <Check size={16} />}
                  </button>
                  <button
                    type="button"
                    className={
                      role === "mentor" ? "role-option selected" : "role-option"
                    }
                    onClick={() => setRole("mentor")}
                  >
                    <Users size={19} />
                    <span>
                      <strong>Mentor</strong>
                      <small>Review and guide projects</small>
                    </span>
                    {role === "mentor" && <Check size={16} />}
                  </button>
                </div>
              </>
            )}

            {/* Email address field */}
            <label>
              Email address
              <input
                type="email"
                value={form.email}
                onChange={update("email")}
                placeholder="you@university.edu"
                autoComplete="email"
                required
              />
            </label>

            {/* Password input with toggle visibility */}
            <label>
              Password
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={update("password")}
                  placeholder="At least 8 characters"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  minLength={8}
                  required
                />
                <button
                  type="button"
                  className="eye-button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </label>

            {/* Confirm password field for signup */}
            {!isLogin && (
              <label>
                Confirm password
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.confirm}
                  onChange={update("confirm")}
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                  required
                />
              </label>
            )}

            {/* Error message alert display */}
            {error && (
              <div className="form-error" role="alert">
                {error}
              </div>
            )}

            {/* Terms and conditions agreement checkbox for signup */}
            {!isLogin && (
              <label className="terms">
                <input type="checkbox" required />
                <span>
                  I agree to the <button type="button">terms of use</button> and
                  privacy policy.
                </span>
              </label>
            )}

            {/* Submit action button */}
            <button
              className="button button-dark button-full"
              disabled={loading}
            >
              {loading ? "Please wait…" : isLogin ? "Log in" : "Create account"}
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Demo account section moved to the bottom of the login form, compact and clean */}
          {isLogin && (
            <div style={{ transform: "scale(0.95)", transformOrigin: "top", marginTop: "16px" }}>
              <div className="auth-divider" style={{ margin: "8px 0 12px 0" }}>or explore with demo</div>
              <DemoAccess showCredentials />
            </div>
          )}

          {/* Sign up alternate action for explorer */}
          {!isLogin && (
            <>
              <div className="auth-divider">or explore first</div>
              <DemoAccess />
            </>
          )}

          {/* Toggle link between login and signup views */}
          <p className="auth-switch">
            {isLogin ? "New to Submity?" : "Already have an account?"}{" "}
            <Link
              href={isLogin ? "/signup" : "/login"}
              style={{ color: "#37805f", fontWeight: 800 }}
            >
              {isLogin ? "Create an account" : "Log in"}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}