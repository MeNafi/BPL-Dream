import Link from 'next/link';
import {
  ArrowRight, BarChart3, Code2, Eye, FileCode2, FolderKanban, LayoutDashboard,
  MessageSquareText, Plus, Send, Settings, Sparkles, Zap,
} from 'lucide-react';
import { Logo } from './logo';
import { StatusBadge } from './status-badge';
import { LandingNav } from './landing-nav';
import { DemoSection } from './demo-section';
import { SiteFooter } from './site-footer';
import type { SubmissionStatus } from '@/lib/api-client';

const previewProjects: { id: string; name: string; updated: string; status: SubmissionStatus }[] = [
  { id: '1', name: 'Campus Connect', updated: '2026-10-16', status: 'approved' },
  { id: '2', name: 'Finwise Dashboard', updated: '2026-10-19', status: 'pending' },
  { id: '3', name: 'Local Lens', updated: '2026-10-09', status: 'rejected' },
];

const features = [
  { icon: Send, title: 'One clear submission flow', text: 'Share your work with the context mentors need to give useful feedback.' },
  { icon: BarChart3, title: 'Know what happens next', text: 'Track every project from submitted to reviewed without chasing updates.' },
  { icon: MessageSquareText, title: 'Feedback that moves work forward', text: 'Keep decisions, notes, and next steps connected to the project.' },
];

const steps = [
  { n: '01', icon: FileCode2, title: 'Submit your project', text: 'Add the links, context, and details your mentor needs.' },
  { n: '02', icon: Eye, title: 'Get a thoughtful review', text: 'Your mentor sees the full picture and leaves focused feedback.' },
  { n: '03', icon: Sparkles, title: 'Keep moving forward', text: 'Use every decision and note to make your next version stronger.' },
];

export function LandingPage() {
  return (
    <main className="landing-page">
      <LandingNav />

      <section className="hero page-shell">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" />The calmer way to ship better work</div>
          <h1>Your projects deserve a <em>better</em> review process.</h1>
          <p>Submit your work, track every review, and receive meaningful feedback through one simple platform.</p>
          <div className="hero-actions">
            <Link className="button button-dark button-large" href="/signup">Get started free <ArrowRight size={17} /></Link>
            <a className="button button-outline button-large" href="#demo"><Zap size={16} /> Try the live demo</a>
          </div>
          <div className="hero-note">
            <div className="avatar-stack"><span>MC</span><span>JL</span><span>AK</span></div>
            <span>Built for ambitious student teams</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Product dashboard preview">
          <div className="glow glow-one" /><div className="glow glow-two" />
          <div className="product-window">
            <div className="window-top">
              <div className="window-dots"><i /><i /><i /></div>
              <span>workspace / overview</span>
              <div className="window-avatar">AK</div>
            </div>
            <div className="window-body">
              <aside className="preview-sidebar">
                <Logo compact />
                <div className="preview-nav active"><LayoutDashboard size={15} /> Overview</div>
                <div className="preview-nav"><FolderKanban size={15} /> Submissions</div>
                <div className="preview-nav"><MessageSquareText size={15} /> Feedback</div>
                <div className="preview-nav"><Settings size={15} /> Settings</div>
              </aside>
              <div className="preview-content">
                <div className="preview-head">
                  <div><span className="preview-kicker">Monday, October 20</span><h3>Good morning, Alex</h3></div>
                  <span className="preview-add"><Plus size={14} /> New project</span>
                </div>
                <div className="preview-stats">
                  <div><span>All projects</span><strong>12</strong><small>+2 this month</small></div>
                  <div><span>In review</span><strong>04</strong><small>Waiting on a mentor</small></div>
                  <div><span>Approved</span><strong>07</strong><small>Great work</small></div>
                </div>
                <div className="preview-table">
                  <div className="preview-table-head"><span>Recent projects</span><span>Status</span></div>
                  {previewProjects.map((project) => (
                    <div className="preview-row" key={project.id}>
                      <div className="project-mini-icon"><Code2 size={14} /></div>
                      <div className="project-mini-name"><strong>{project.name}</strong><small>Updated {project.updated}</small></div>
                      <StatusBadge status={project.status} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="logo-strip page-shell">
        <span>MADE FOR PEOPLE WHO CARE ABOUT THE DETAILS</span>
        <div><b>student</b><b>studio</b><b>northstar</b><b>orbit labs</b></div>
      </section>

      <section className="section page-shell" id="features">
        <div className="section-heading">
          <div><div className="eyebrow">Everything in one place</div><h2>From first draft to final sign-off.</h2></div>
          <p>Submity brings your submission and review workflow into focus, so your energy stays on the work itself.</p>
        </div>
        <div className="feature-grid">
          {features.map(({ icon: Icon, title, text }, index) => (
            <article className="feature-card" key={title}>
              <div className={`feature-icon feature-icon-${index}`}><Icon size={20} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="card-arrow"><ArrowRight size={17} /></span>
            </article>
          ))}
        </div>
      </section>

      <section className="process-section" id="process">
        <div className="page-shell">
          <div className="section-heading centered">
            <div><div className="eyebrow">Simple by design</div><h2>A better loop for better work.</h2></div>
            <p>Three focused steps. No inbox archaeology. No wondering what happens next.</p>
          </div>
          <div className="process-grid">
            <div className="process-line" />
            {steps.map(({ n, icon: Icon, title, text }) => (
              <div className="process-step" key={n}>
                <div className="step-number">{n}</div>
                <Icon size={21} />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DemoSection />

      <section className="final-cta page-shell" id="about">
        <div>
          <div className="eyebrow light-eyebrow">Ready when you are</div>
          <h2>Make the work visible.<br /><em>Make the next step clear.</em></h2>
        </div>
        <Link className="button button-light button-large" href="/signup">Start submitting <ArrowRight size={17} /></Link>
      </section>

      <SiteFooter />
    </main>
  );
}
