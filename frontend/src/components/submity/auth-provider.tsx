"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  api,
  isApiConfigured,
  type AuthUser,
  type UserRole,
} from "@/lib/api-client";
import {
  DEMO_ACCOUNTS,
  matchDemoCredentials,
  readSession,
  writeSession,
} from "@/lib/demo-data";

// Define the shape of authentication context
type AuthContextValue = {
  user: AuthUser | null;
  /** false until the stored session has been checked (avoids a login-page flash). */
  ready: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  signup: (data: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
  }) => Promise<AuthUser>;
  demoLogin: (role: UserRole) => AuthUser;
  logout: () => Promise<void>;
};

// Create authentication context
const AuthContext = createContext<AuthContextValue | null>(null);

// Custom hook to consume auth context easily
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

/** Where a signed-in user lands based on their role. */
export const homeFor = (user: AuthUser | null) => {
  if (!user?.role) return "/student";

  // Normalize role to lowercase to prevent case-mismatch issues (e.g., 'STUDENT' vs 'student')
  const role = user.role.toLowerCase();

  if (role === "student") {
    return "/student";
  } else if (role === "mentor") {
    return "/mentor";
  }

  // Default fallback route
  return "/student";
};

// Auth provider component wrapping application state
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  // Check initial session status on component mount
  useEffect(() => {
    let active = true;
    (async () => {
      const stored = readSession();
      if (stored) {
        if (active) {
          setUser(stored);
          setReady(true);
        }
        return;
      }
      if (isApiConfigured) {
        try {
          const me = await api.me();
          if (active && me?.email) setUser(me);
        } catch {
          /* not signed in */
        }
      }
      if (active) setReady(true);
    })();
    return () => {
      active = false;
    };
  }, []);

  // Initialize session state and persist demo data if needed
  const startSession = useCallback((next: AuthUser) => {
    setUser(next);
    writeSession(next.demo ? next : null);
    return next;
  }, []);

  // Handle quick demo account login
  const demoLogin = useCallback(
    (role: UserRole) => startSession({ ...DEMO_ACCOUNTS[role] }),
    [startSession],
  );

  // Handle email and password login flow
  const login = useCallback(
    async (email: string, password: string) => {
      const demoRole = matchDemoCredentials(email, password);
      if (demoRole) return demoLogin(demoRole);
      return startSession(await api.login({ email, password }));
    },
    [demoLogin, startSession],
  );

  // Handle new user registration flow
  const signup = useCallback(
    async (data: {
      name: string;
      email: string;
      password: string;
      role: UserRole;
    }) => {
      if (!isApiConfigured) {
        // No backend: create a local-only preview account so the flow is still explorable.
        return startSession({
          id: `local-${Date.now()}`,
          name: data.name,
          email: data.email,
          role: data.role,
          demo: true,
        });
      }
      return startSession(await api.signup(data));
    },
    [startSession],
  );

  // Handle user logout and clear session
  const logout = useCallback(async () => {
    if (user && !user.demo) {
      try {
        await api.logout();
      } catch {
        /* the session may already be expired */
      }
    }
    setUser(null);
    writeSession(null);
  }, [user]);

  // Memoize context value to optimize performance
  const value = useMemo(
    () => ({ user, ready, login, signup, demoLogin, logout }),
    [user, ready, login, signup, demoLogin, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
