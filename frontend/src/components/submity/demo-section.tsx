'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle2, GraduationCap, Users } from 'lucide-react';
import type { UserRole } from '@/lib/api-client';
import { DEMO_ACCOUNTS, DEMO_PASSWORD } from '@/lib/demo-data';
import { homeFor, useAuth } from './auth-provider';
import { useNotify } from './toast-provider';

const roles: {
  role: UserRole;
  title: string;
  subtitle: string;
  points: string[];
  cta: string;
  icon: typeof Users;
}[] = [
  {
    role: 'student',
    title: 'Student workspace',
    subtitle: 'Signed in as Alex Morgan',
    icon: GraduationCap,
    points: [
      'Submit a project with GitHub, live demo and context',
      'Track every submission from in review to approved',
      'Read mentor feedback and know exactly what to improve',
    ],
    cta: 'Enter student demo',
  },
  {
    role: 'mentor',
    title: 'Mentor workspace',
    subtitle: 'Signed in as Maya Chen',
    icon: Users,
    points: [
      'See the full review queue with search and filters',
      'Approve a project or request changes with a clear note',
      'Watch decisions appear instantly on the student side',
    ],
    cta: 'Enter mentor demo',
  },
];

export function DemoSection() {
  const { demoLogin } = useAuth();
  const router = useRouter();
  const notify = useNotify();

  const enter = (role: UserRole) => {
    const user = demoLogin(role);
    notify({ message: `Signed in as the demo ${role}.` });
    router.push(homeFor(user));
  };

  return (
    <section className="demo-section page-shell" id="demo">
      <div className="section-heading">
        <div>
          <div className="eyebrow">Live demo</div>
          <h2>See it from both sides.</h2>
        </div>
        <p>No account needed. Jump straight into a ready-made workspace and try the full submit → review → feedback loop.</p>
      </div>

      <div className="demo-grid">
        {roles.map(({ role, title, subtitle, points, cta, icon: Icon }) => (
          <article className="demo-card" key={role}>
            <div className="demo-card-head">
              <span className={`demo-icon ${role}`}><Icon size={20} /></span>
              <div>
                <h3>{title}</h3>
                <small>{subtitle}</small>
              </div>
            </div>
            <ul>
              {points.map((point) => (
                <li key={point}><CheckCircle2 size={16} /><span>{point}</span></li>
              ))}
            </ul>
            <button className="button button-dark button-large" onClick={() => enter(role)}>
              {cta} <ArrowRight size={16} />
            </button>
          </article>
        ))}
      </div>
      <p className="demo-note">
        Prefer typing? Use <code>{DEMO_ACCOUNTS.student.email}</code> or <code>{DEMO_ACCOUNTS.mentor.email}</code> with
        password <code>{DEMO_PASSWORD}</code> on the login page.
      </p>
    </section>
  );
}
