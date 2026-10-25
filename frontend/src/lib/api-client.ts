export type UserRole = 'student' | 'mentor';

export type AuthUser = {
  id?: string;
  name?: string;
  email?: string;
  role?: UserRole | 'admin';
  /** True when the session is a local demo session (no backend involved). */
  demo?: boolean;
};

export type SubmissionStatus = 'pending' | 'approved' | 'rejected';

export type Submission = {
  id: string;
  projectName: string;
  description?: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  status: SubmissionStatus;
  createdAt: string;
  studentId?: string;
  studentName?: string;
  studentEmail?: string;
  feedback?: string;
  reviewerName?: string;
  reviewedAt?: string;
};

export type ApiError = Error & { status?: number };

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/+$/, '');

/** When no API URL is configured the app runs entirely in demo mode. */
export const isApiConfigured = Boolean(apiBaseUrl);

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  if (!apiBaseUrl) {
    const error: ApiError = new Error(
      'The backend is not connected in this build. Use one of the demo accounts to explore the app.'
    );
    error.status = 0;
    throw error;
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const payload = (await response.json().catch(() => null)) as { message?: string } | T | null;
  if (!response.ok) {
    const error: ApiError = new Error(
      payload && typeof payload === 'object' && 'message' in payload && payload.message
        ? payload.message
        : 'Something went wrong. Please try again.'
    );
    error.status = response.status;
    throw error;
  }

  return payload as T;
}

export const api = {
  signup: (data: { name: string; email: string; password: string; role: UserRole }) =>
    request<AuthUser>('/api/auth/signup', { method: 'POST', body: JSON.stringify(data) }),
  login: (data: { email: string; password: string }) =>
    request<AuthUser>('/api/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  logout: () => request<void>('/api/auth/logout', { method: 'POST' }),
  me: () => request<AuthUser>('/api/auth/me'),
  createSubmission: (data: { projectName: string; githubUrl: string; liveDemoUrl?: string; description: string }) =>
    request<Submission>('/api/submissions', { method: 'POST', body: JSON.stringify(data) }),
  mySubmissions: () => request<Submission[]>('/api/submissions/my'),
  submission: (id: string) => request<Submission>(`/api/submissions/${encodeURIComponent(id)}`),
  adminSubmissions: (query: string) =>
    request<{ items: Submission[]; total?: number }>(`/api/admin/submissions${query}`),
  adminStats: () =>
    request<{ total: number; pending: number; approved: number; rejected: number }>('/api/admin/submissions/stats'),
  adminSubmission: (id: string) => request<Submission>(`/api/admin/submissions/${encodeURIComponent(id)}`),
  review: (id: string, data: { status: 'approved' | 'rejected'; feedback?: string }) =>
    request<Submission>(`/api/admin/submissions/${encodeURIComponent(id)}/review`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
};
