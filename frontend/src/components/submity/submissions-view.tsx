'use client';

import type { KeyboardEvent } from 'react';
import {
  ArrowRight, BarChart3, CheckCircle2, ClipboardCheck, Code2, ExternalLink, Eye, FolderKanban,
  Github, MessageSquareText, Plus, Sparkles, Zap,
} from 'lucide-react';
import type { Submission } from '@/lib/api-client';
import { formatDate, initials } from '@/lib/utils';
import { StatusBadge } from './status-badge';

export type Stats = { total: number; pending: number; approved: number; rejected: number };

export const computeStats = (items: Submission[]): Stats => ({
  total: items.length,
  pending: items.filter((s) => s.status === 'pending').length,
  approved: items.filter((s) => s.status === 'approved').length,
  rejected: items.filter((s) => s.status === 'rejected').length,
});

/* ------------------------------------------------------------ stat cards */
export function StatGrid({ stats, isMentor }: { stats: Stats; isMentor: boolean }) {
  return (
    <div className="stat-grid">
      <div className="stat-card">
        <span className="stat-icon blue"><FolderKanban size={18} /></span>
        <span>Total submissions</span><strong>{stats.total}</strong>
        <small>{isMentor ? 'Across all students' : 'Projects in your workspace'}</small>
      </div>
      <div className="stat-card">
        <span className="stat-icon amber"><ClipboardCheck size={18} /></span>
        <span>In review</span><strong>{stats.pending}</strong>
        <small>{stats.pending ? 'Waiting for a decision' : 'You’re all caught up'}</small>
      </div>
      <div className="stat-card">
        <span className="stat-icon green"><CheckCircle2 size={18} /></span>
        <span>Approved</span><strong>{stats.approved}</strong>
        <small>Ready to celebrate</small>
      </div>
      <div className="stat-card">
        <span className="stat-icon red"><MessageSquareText size={18} /></span>
        <span>Changes requested</span><strong>{stats.rejected}</strong>
        <small>Projects with next steps</small>
      </div>
    </div>
  );
}

/* -------------------------------------------------------- overview cards */
export function OverviewCards({ stats, isMentor, onPrimary }: { stats: Stats; isMentor: boolean; onPrimary: () => void }) {
  const percent = stats.total ? Math.round((stats.approved / stats.total) * 100) : 0;
  return (
    <div className="dashboard-grid">
      <section className="dashboard-card progress-card">
        <div className="card-header">
          <div><span className="eyebrow">Your rhythm</span><h2>{isMentor ? 'Review queue' : 'Project momentum'}</h2></div>
          <BarChart3 size={20} />
        </div>
        <div className="progress-visual">
          <div className="progress-ring"><strong>{percent}%</strong><span>approved</span></div>
          <div className="progress-legend">
            <div><i className="legend-dot green-dot" /><span>Approved</span><strong>{stats.approved}</strong></div>
            <div><i className="legend-dot amber-dot" /><span>In review</span><strong>{stats.pending}</strong></div>
            <div><i className="legend-dot red-dot" /><span>Changes requested</span><strong>{stats.rejected}</strong></div>
          </div>
        </div>
        <div className="insight">
          <Sparkles size={16} />
          <span>
            {stats.pending
              ? isMentor
                ? `${stats.pending} project${stats.pending === 1 ? ' is' : 's are'} waiting for your review.`
                : `You have ${stats.pending} project${stats.pending === 1 ? '' : 's'} waiting for feedback.`
              : 'Nice work. Everything is up to date.'}
          </span>
        </div>
      </section>

      <section className="dashboard-card focus-card">
        <div className="card-header">
          <div><span className="eyebrow">Next up</span><h2>{isMentor ? 'Keep the queue moving' : 'Keep building'}</h2></div>
          <Zap size={20} />
        </div>
        <div className="focus-content">
          <div className="focus-icon"><Code2 size={23} /></div>
          <div>
            <strong>{isMentor ? 'Review your next project' : stats.total ? 'Share your next idea' : 'Submit your first project'}</strong>
            <p>{isMentor ? 'Small, thoughtful feedback makes a big difference.' : 'The best work starts as a draft. Put yours in motion.'}</p>
          </div>
        </div>
        <button className="button button-soft" onClick={onPrimary}>
          {isMentor ? 'Open review queue' : 'Submit a project'} <ArrowRight size={15} />
        </button>
      </section>
    </div>
  );
}

/* ----------------------------------------------------------- submissions */
export function SubmissionsCard({
  items, loading, error, isMentor, title, eyebrow, hasFilters, onOpen, onReview, onViewAll, onSubmitNew,
}: {
  items: Submission[];
  loading: boolean;
  error: string;
  isMentor: boolean;
  title: string;
  eyebrow: string;
  hasFilters: boolean;
  onOpen: (submission: Submission) => void;
  onReview: (submission: Submission) => void;
  onViewAll?: () => void;
  onSubmitNew: () => void;
}) {
  const rowKey = (submission: Submission) => (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpen(submission);
    }
  };

  return (
    <section className="dashboard-card submissions-card">
      <div className="card-header">
        <div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>
        {onViewAll
          ? <button className="text-link" onClick={onViewAll}>View all <ArrowRight size={15} /></button>
          : <span className="card-count">{items.length} {items.length === 1 ? 'project' : 'projects'}</span>}
      </div>

      {loading ? (
        <div className="loading-state"><div /><div /><div /></div>
      ) : error ? (
        <div className="empty-state">
          <div className="empty-icon"><FolderKanban size={23} /></div>
          <h3>We couldn’t load your projects</h3>
          <p>{error}</p>
        </div>
      ) : items.length ? (
        <div className={isMentor ? 'submission-table has-student' : 'submission-table'}>
          <div className="table-head">
            <span>Project</span>{isMentor && <span>Student</span>}<span>Submitted</span><span>Status</span><span>Actions</span>
          </div>
          {items.map((submission) => (
            <div
              className="submission-row"
              key={submission.id}
              role="button"
              tabIndex={0}
              onClick={() => onOpen(submission)}
              onKeyDown={rowKey(submission)}
            >
              <div className="submission-project">
                <span className="project-icon"><Code2 size={16} /></span>
                <span><strong>{submission.projectName}</strong><small>{submission.description || 'Project submission'}</small></span>
              </div>
              {isMentor && (
                <span className="student-cell">
                  <span className="table-avatar">{initials(submission.studentName, 'ST')}</span>
                  {submission.studentName || 'Student'}
                </span>
              )}
              <span className="date-cell">{formatDate(submission.createdAt)}</span>
              <StatusBadge status={submission.status} />
              <div className="row-actions" onClick={(event) => event.stopPropagation()} onKeyDown={(event) => event.stopPropagation()}>
                {submission.githubUrl && (
                  <a className="icon-button" title="Open repository" aria-label="Open repository" href={submission.githubUrl} target="_blank" rel="noopener noreferrer"><Github size={16} /></a>
                )}
                {submission.liveDemoUrl && (
                  <a className="icon-button" title="Open live demo" aria-label="Open live demo" href={submission.liveDemoUrl} target="_blank" rel="noopener noreferrer"><ExternalLink size={16} /></a>
                )}
                {isMentor && submission.status === 'pending'
                  ? <button className="button button-small" onClick={() => onReview(submission)}>Review</button>
                  : <button className="icon-button" title="View details" aria-label="View details" onClick={() => onOpen(submission)}><Eye size={16} /></button>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon"><FolderKanban size={23} /></div>
          <h3>{hasFilters ? 'No matching projects' : 'No submissions yet'}</h3>
          <p>{hasFilters ? 'Try a different search or status filter.' : 'Projects you submit will appear here.'}</p>
          {!isMentor && !hasFilters && <button className="button button-dark" onClick={onSubmitNew}><Plus size={16} /> Submit your first project</button>}
        </div>
      )}
    </section>
  );
}
