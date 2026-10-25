'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight, Bell, CheckCircle2, ChevronDown, ClipboardCheck, FolderKanban, LayoutDashboard, Lightbulb,
  LogOut, Menu, MessageSquareText, Moon, Plus, Repeat, Search, Settings, Sun, X, Zap, type LucideIcon,
} from 'lucide-react';
import type { AuthUser, Submission, UserRole } from '@/lib/api-client';
import { greeting, initials } from '@/lib/utils';
import { useSubmissions } from '@/hooks/use-submissions';
import { homeFor, useAuth } from './auth-provider';
import { LogoLink } from './logo';
import { DetailModal, ReviewModal, SubmitModal } from './modals';
import { SettingsPanel } from './settings-panel';
import { OverviewCards, StatGrid, SubmissionsCard, computeStats } from './submissions-view';
import { useNotify } from './toast-provider';

type PageKey = 'overview' | 'submit' | 'mine' | 'all' | 'pending' | 'approved' | 'changes' | 'settings';
type Filter = 'all' | Submission['status'];

const NAV: Record<UserRole, { key: PageKey; label: string; icon: LucideIcon }[]> = {
  student: [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'submit', label: 'Submit project', icon: Plus },
    { key: 'mine', label: 'My submissions', icon: FolderKanban },
    { key: 'settings', label: 'Account settings', icon: Settings },
  ],
  mentor: [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'all', label: 'All submissions', icon: FolderKanban },
    { key: 'pending', label: 'Pending reviews', icon: ClipboardCheck },
    { key: 'approved', label: 'Approved projects', icon: CheckCircle2 },
    { key: 'changes', label: 'Changes requested', icon: MessageSquareText },
    { key: 'settings', label: 'Account settings', icon: Settings },
  ],
};

const PAGE_FILTER: Partial<Record<PageKey, Filter>> = { pending: 'pending', approved: 'approved', changes: 'rejected' };
const THEME_KEY = 'submity.theme';

export function Workspace({ role }: { role: UserRole }) {
  const { user, ready, logout } = useAuth();
  const router = useRouter();
  const notify = useNotify();
  const leaving = useRef(false);
  const wrongSide = Boolean(user) && homeFor(user) !== `/${role}`;

  useEffect(() => {
    if (!ready || leaving.current) return;
    if (!user) router.replace('/login');
    else if (wrongSide) router.replace(homeFor(user));
  }, [ready, user, wrongSide, router]);

  const handleLogout = useCallback(async () => {
    leaving.current = true;
    router.replace('/');
    await logout();
    notify({ message: 'You have been logged out.' });
  }, [logout, router, notify]);

  if (!ready || !user || wrongSide) {
    return <div className="page-loading"><div className="spinner" role="status" aria-label="Loading" /></div>;
  }
  return <WorkspaceInner user={user} isMentor={role === 'mentor'} onLogout={handleLogout} />;
}

function WorkspaceInner({ user, isMentor, onLogout }: { user: AuthUser; isMentor: boolean; onLogout: () => void }) {
  const router = useRouter();
  const notify = useNotify();
  const { demoLogin } = useAuth();
  const { items, loading, error, demo, create, review, resetDemo } = useSubmissions(user, isMentor);

  const [dark, setDark] = useState(() => {
    try { return window.localStorage.getItem(THEME_KEY) === 'dark'; } catch { return false; }
  });
  const [page, setPage] = useState<PageKey>('overview');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [viewing, setViewing] = useState<Submission | null>(null);
  const [reviewing, setReviewing] = useState<Submission | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifSeen, setNotifSeen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const side: UserRole = isMentor ? 'mentor' : 'student';
  const nav = NAV[side];
  const label = nav.find((n) => n.key === page)?.label ?? 'Overview';
  const sorted = [...items].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  const stats = computeStats(items);
  const firstName = (user.name || 'there').split(' ')[0];

  const isListPage = page !== 'overview' && page !== 'settings';
  const pageFilter = PAGE_FILTER[page];
  const activeFilter: Filter = pageFilter ?? filter;
  const q = query.trim().toLowerCase();
  const filtered = sorted.filter(
    (s) =>
      (activeFilter === 'all' || s.status === activeFilter) &&
      (!q || s.projectName.toLowerCase().includes(q) || (s.studentName ?? '').toLowerCase().includes(q))
  );
  const visible = page === 'overview' ? sorted.slice(0, 5) : filtered;

  useEffect(() => {
    if (!notifOpen) return;
    const close = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [notifOpen]);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    try { window.localStorage.setItem(THEME_KEY, next ? 'dark' : 'light'); } catch { /* ignore */ }
  };

  const selectPage = (key: PageKey) => {
    setMobileOpen(false);
    if (key === 'submit') return setShowForm(true);
    setPage(key);
    setQuery('');
  };

  const switchSide = () => {
    const other: UserRole = isMentor ? 'student' : 'mentor';
    demoLogin(other);
    notify({ message: `Switched to the demo ${other}.` });
    router.push(`/${other}`);
  };

  const notifications = (isMentor
    ? sorted.filter((s) => s.status === 'pending').slice(0, 4).map((s) => ({
        s, title: `${s.studentName || 'A student'} submitted ${s.projectName}`, sub: 'Waiting for your review',
      }))
    : [...sorted].filter((s) => s.status !== 'pending')
        .sort((a, b) => +new Date(b.reviewedAt ?? 0) - +new Date(a.reviewedAt ?? 0)).slice(0, 4).map((s) => ({
        s,
        title: s.status === 'approved' ? `${s.projectName} was approved` : `Changes requested on ${s.projectName}`,
        sub: s.feedback || 'Open the project to read the feedback.',
      })));

  const handleSubmit = async (input: { projectName: string; githubUrl: string; liveDemoUrl: string; description: string }) => {
    await create({ ...input, liveDemoUrl: input.liveDemoUrl || undefined });
    setShowForm(false);
    setPage('mine');
    notify({ message: 'Project submitted for review.' });
  };

  const handleReview = async (status: 'approved' | 'rejected', feedback: string) => {
    if (!reviewing) return;
    await review(reviewing.id, status, feedback);
    setReviewing(null);
    setViewing(null);
    notify({ message: status === 'approved' ? 'Project approved.' : 'Feedback sent to the student.' });
  };

  const heading = page === 'overview' ? `${greeting()}, ${firstName}.` : label;
  const listTitle = page === 'overview' ? (isMentor ? 'Latest submissions' : 'Recent submissions') : label;
  const hasFilters = Boolean(q) || activeFilter !== 'all';

  return (
    <div className={dark ? 'app-shell dark-app' : 'app-shell'}>
      <button className={mobileOpen ? 'sidebar-backdrop show' : 'sidebar-backdrop'} onClick={() => setMobileOpen(false)} aria-label="Close menu" tabIndex={-1} />
      <aside className={mobileOpen ? 'app-sidebar open' : 'app-sidebar'}>
        <div className="sidebar-top">
          <LogoLink />
          <button className="sidebar-close" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={19} /></button>
        </div>
        <div className="workspace-switcher">
          <span className="workspace-icon">{isMentor ? 'M' : initials(user.name, 'A').slice(0, 1)}</span>
          <span><strong>{isMentor ? 'Mentor workspace' : `${firstName}’s workspace`}</strong><small>{isMentor ? 'Review team' : 'Personal projects'}</small></span>
          <ChevronDown size={15} />
        </div>
        <nav className="sidebar-nav" aria-label="Workspace">
          {nav.map(({ key, label: text, icon: Icon }) => (
            <button key={key} className={page === key ? 'sidebar-link active' : 'sidebar-link'} onClick={() => selectPage(key)}>
              <Icon size={17} />{text}
              {key === 'pending' && stats.pending > 0 && <span className="nav-count">{stats.pending}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          {demo ? (
            <button className="sidebar-help" onClick={switchSide}>
              <Repeat size={17} />
              <span><strong>See the other side</strong><small>Switch to the {isMentor ? 'student' : 'mentor'} demo</small></span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <a className="sidebar-help" href="mailto:hello@submity.dev">
              <Lightbulb size={17} />
              <span><strong>Need a hand?</strong><small>Contact support</small></span>
              <ArrowRight size={14} />
            </a>
          )}
          <button className="sidebar-link" onClick={onLogout}><LogOut size={17} /> Log out</button>
          <div className="profile-mini">
            <span className="profile-avatar">{initials(user.name)}</span>
            <span><strong>{user.name || 'Alex Morgan'}</strong><small>{user.email || 'student@submity.demo'}</small></span>
          </div>
        </div>
      </aside>

      <div className="app-main">
        <header className="app-header">
          <button className="mobile-nav-button" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={20} /></button>
          <div className="header-breadcrumb">
            <span>{isMentor ? 'Mentor workspace' : 'My workspace'}</span><span className="crumb-sep">/</span><b>{label}</b>
          </div>
          <div className="header-actions">
            {demo && <span className="demo-pill"><Zap size={11} /><span>Demo mode</span></span>}
            <button className="icon-button" onClick={toggleDark} aria-label="Toggle theme">{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
            <div className="notif-wrap" ref={notifRef}>
              <button
                className="icon-button notification-button"
                aria-label="Notifications"
                aria-expanded={notifOpen}
                onClick={() => { setNotifOpen(!notifOpen); setNotifSeen(true); }}
              >
                <Bell size={18} /><i hidden={notifSeen || notifications.length === 0} />
              </button>
              {notifOpen && (
                <div className="notif-panel" role="menu">
                  <div className="notif-title">Notifications</div>
                  {notifications.length ? notifications.map(({ s, title, sub }) => (
                    <button key={s.id} className="notif-item" onClick={() => { setNotifOpen(false); setViewing(s); }}>
                      <span className={`notif-icon ${s.status}`}>
                        {s.status === 'approved' ? <CheckCircle2 size={14} /> : s.status === 'rejected' ? <MessageSquareText size={14} /> : <ClipboardCheck size={14} />}
                      </span>
                      <span><strong>{title}</strong><small>{sub}</small></span>
                    </button>
                  )) : <div className="notif-empty">You’re all caught up.</div>}
                </div>
              )}
            </div>
            <div className="header-avatar">{initials(user.name)}</div>
          </div>
        </header>

        <main className="dashboard-content">
          <div className="dashboard-heading">
            <div>
              <div className="eyebrow">{isMentor ? 'Review workspace' : 'Your workspace'}</div>
              <h1>{heading}</h1>
              <p>{isMentor ? 'Keep your review queue moving and help good work get better.' : 'A clear view of your projects, progress, and next steps.'}</p>
            </div>
            {!isMentor && page !== 'settings' && (
              <button className="button button-dark" onClick={() => setShowForm(true)}><Plus size={17} /> Submit a project</button>
            )}
          </div>

          {page === 'settings' ? (
            <SettingsPanel user={user} dark={dark} onToggleDark={toggleDark} demo={demo} onResetDemo={() => { resetDemo(); notify({ message: 'Demo data has been reset.' }); }} />
          ) : (
            <>
              {isListPage && (
                <div className="toolbar">
                  <div className="search-box">
                    <Search size={17} />
                    <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={isMentor ? 'Search projects or students' : 'Search your projects'} aria-label="Search" />
                  </div>
                  {!pageFilter && (
                    <select value={filter} onChange={(e) => setFilter(e.target.value as Filter)} aria-label="Filter by status">
                      <option value="all">All statuses</option>
                      <option value="pending">In review</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Changes requested</option>
                    </select>
                  )}
                </div>
              )}
              <StatGrid stats={stats} isMentor={isMentor} />
              {page === 'overview' && (
                <OverviewCards stats={stats} isMentor={isMentor} onPrimary={() => (isMentor ? selectPage('pending') : setShowForm(true))} />
              )}
              <SubmissionsCard
                items={visible}
                loading={loading}
                error={error}
                isMentor={isMentor}
                title={listTitle}
                eyebrow={isMentor ? 'The work in front of you' : 'Your recent work'}
                hasFilters={hasFilters}
                onOpen={setViewing}
                onReview={setReviewing}
                onViewAll={page === 'overview' ? () => selectPage(isMentor ? 'all' : 'mine') : undefined}
                onSubmitNew={() => setShowForm(true)}
              />
            </>
          )}
        </main>
      </div>

      {showForm && <SubmitModal onClose={() => setShowForm(false)} onSubmit={handleSubmit} />}
      {viewing && !reviewing && (
        <DetailModal
          submission={viewing}
          isMentor={isMentor}
          onClose={() => setViewing(null)}
          onReview={() => setReviewing(viewing)}
        />
      )}
      {reviewing && <ReviewModal submission={reviewing} onClose={() => setReviewing(null)} onReview={handleReview} />}
    </div>
  );
}
