import type { AuthUser, Submission, UserRole } from './api-client';

/** Credentials shown on the login page – also accepted when typed manually. */
export const DEMO_PASSWORD = 'Demo@1234';

export const DEMO_ACCOUNTS: Record<UserRole, AuthUser> = {
  student: { id: 'demo-student', name: 'Alex Morgan', email: 'student@submity.demo', role: 'student', demo: true },
  mentor: { id: 'demo-mentor', name: 'Maya Chen', email: 'mentor@submity.demo', role: 'mentor', demo: true },
};

export function matchDemoCredentials(email: string, password: string): UserRole | null {
  if (password !== DEMO_PASSWORD) return null;
  const normalized = email.trim().toLowerCase();
  return (Object.keys(DEMO_ACCOUNTS) as UserRole[]).find((role) => DEMO_ACCOUNTS[role].email === normalized) ?? null;
}

const SESSION_KEY = 'submity.session.v1';
const SUBMISSIONS_KEY = 'submity.demo.submissions.v1';

const hasStorage = () => typeof window !== 'undefined' && !!window.localStorage;

/* ---------- session ---------- */
export function readSession(): AuthUser | null {
  if (!hasStorage()) return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function writeSession(user: AuthUser | null) {
  if (!hasStorage()) return;
  try {
    if (user) window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else window.localStorage.removeItem(SESSION_KEY);
  } catch {
    /* storage can be blocked (private mode) – the app still works in memory */
  }
}

/* ---------- demo submissions ---------- */
const daysAgo = (days: number) => new Date(Date.now() - days * 86_400_000).toISOString();

function seedSubmissions(): Submission[] {
  const alex = { studentId: 'demo-student', studentName: 'Alex Morgan', studentEmail: 'student@submity.demo' };
  return [
    {
      id: 'seed-1', ...alex, projectName: 'Campus Connect', status: 'approved', createdAt: daysAgo(6),
      description: 'A peer-to-peer community platform for students to find clubs, events and study groups.',
      githubUrl: 'https://github.com', liveDemoUrl: 'https://example.com',
      feedback: 'Strong product thinking and a clear, focused experience. Loved the onboarding flow.',
      reviewerName: 'Maya Chen', reviewedAt: daysAgo(4),
    },
    {
      id: 'seed-2', ...alex, projectName: 'Finwise Dashboard', status: 'pending', createdAt: daysAgo(2),
      description: 'A calm, data-rich dashboard for personal finance with budgets and monthly insights.',
      githubUrl: 'https://github.com', liveDemoUrl: 'https://example.com',
    },
    {
      id: 'seed-3', ...alex, projectName: 'Local Lens', status: 'rejected', createdAt: daysAgo(13),
      description: 'Discover independent shops and makers near you with a map-first experience.',
      githubUrl: 'https://github.com',
      feedback: 'Great idea! Please include a more complete mobile flow and add empty states, then resubmit.',
      reviewerName: 'Jordan Lee', reviewedAt: daysAgo(11),
    },
    {
      id: 'seed-4', studentId: 'seed-student-2', studentName: 'Priya Nair', studentEmail: 'priya@university.edu',
      projectName: 'TaskFlow Kanban', status: 'pending', createdAt: daysAgo(1),
      description: 'A drag-and-drop kanban board for student project teams with real-time updates.',
      githubUrl: 'https://github.com', liveDemoUrl: 'https://example.com',
    },
    {
      id: 'seed-5', studentId: 'seed-student-3', studentName: 'Daniel Kim', studentEmail: 'daniel@university.edu',
      projectName: 'Recipe Radar', status: 'pending', createdAt: daysAgo(3),
      description: 'Scan your pantry and get recipe ideas that reduce food waste.',
      githubUrl: 'https://github.com',
    },
    {
      id: 'seed-6', studentId: 'seed-student-4', studentName: 'Sara Ali', studentEmail: 'sara@university.edu',
      projectName: 'Budget Buddy', status: 'approved', createdAt: daysAgo(9),
      description: 'A shared-expense tracker for roommates with fair-split suggestions.',
      githubUrl: 'https://github.com', liveDemoUrl: 'https://example.com',
      feedback: 'Clean code, thoughtful edge cases and a very polished UI.',
      reviewerName: 'Maya Chen', reviewedAt: daysAgo(7),
    },
  ];
}

export function readDemoSubmissions(): Submission[] {
  if (hasStorage()) {
    try {
      const raw = window.localStorage.getItem(SUBMISSIONS_KEY);
      if (raw) return JSON.parse(raw) as Submission[];
    } catch {
      /* fall through to the seed data */
    }
  }
  const seed = seedSubmissions();
  writeDemoSubmissions(seed);
  return seed;
}

export function writeDemoSubmissions(items: Submission[]) {
  if (!hasStorage()) return;
  try {
    window.localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(items));
  } catch {
    /* ignore */
  }
}

export function resetDemoSubmissions(): Submission[] {
  const seed = seedSubmissions();
  writeDemoSubmissions(seed);
  return seed;
}

export const makeId = () => `s-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
