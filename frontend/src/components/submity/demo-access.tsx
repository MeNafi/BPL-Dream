'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight, GraduationCap, Users, Zap } from 'lucide-react';
import type { UserRole } from '@/lib/api-client';
import { DEMO_ACCOUNTS, DEMO_PASSWORD } from '@/lib/demo-data';
import { homeFor, useAuth } from './auth-provider';
import { useNotify } from './toast-provider';

/** One-click demo logins for both sides (student + mentor) so reviewers never need an account. */
export function DemoAccess({ showCredentials = false }: { showCredentials?: boolean }) {
  const { demoLogin } = useAuth();
  const router = useRouter();
  const notify = useNotify();

  const enter = (role: UserRole) => {
    const user = demoLogin(role);
    notify({ message: `Signed in as the demo ${role}.` });
    router.push(homeFor(user));
  };

  return (
    <div className="demo-access" id="demo-login">
      <div className="demo-head">
        <span className="demo-badge"><Zap size={12} /> Recruiter or reviewer?</span>
        <p>Skip the sign-up and explore both sides instantly. No backend needed.</p>
      </div>
      <div className="demo-buttons">
        <button type="button" className="demo-button" onClick={() => enter('student')}>
          <span className="demo-icon student"><GraduationCap size={18} /></span>
          <span><strong>Student demo</strong><small>Submit &amp; track projects</small></span>
          <ArrowRight size={15} />
        </button>
        <button type="button" className="demo-button" onClick={() => enter('mentor')}>
          <span className="demo-icon mentor"><Users size={18} /></span>
          <span><strong>Mentor demo</strong><small>Review &amp; give feedback</small></span>
          <ArrowRight size={15} />
        </button>
      </div>
      {showCredentials && (
        <p className="demo-credentials">
          Or sign in manually: <code>{DEMO_ACCOUNTS.student.email}</code> or <code>{DEMO_ACCOUNTS.mentor.email}</code>
          {' '}· password <code>{DEMO_PASSWORD}</code>
        </p>
      )}
    </div>
  );
}
