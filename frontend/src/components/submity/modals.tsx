'use client';

import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { Check, Clock, Code2, ExternalLink, Github, MessageSquareText, Send, X, CheckCircle2 } from 'lucide-react';
import type { Submission } from '@/lib/api-client';
import { formatDate } from '@/lib/utils';
import { StatusBadge } from './status-badge';

function ModalShell({ children, onClose, className = '' }: { children: ReactNode; onClose: () => void; className?: string }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className={`modal-card ${className}`} role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Close"><X size={18} /></button>
        {children}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- submit */
type SubmitInput = { projectName: string; githubUrl: string; liveDemoUrl: string; description: string };

export function SubmitModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (input: SubmitInput) => Promise<void> }) {
  const [form, setForm] = useState<SubmitInput>({ projectName: '', githubUrl: '', liveDemoUrl: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      await onSubmit(form);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to submit the project.');
      setLoading(false);
    }
  };

  return (
    <ModalShell onClose={onClose}>
      <div className="eyebrow">New submission</div>
      <h2>Share what you’ve built.</h2>
      <p className="modal-subtitle">Give your mentor the context they need to leave useful feedback.</p>
      <form onSubmit={submit} className="submission-form">
        <label>Project name
          <input value={form.projectName} onChange={(e) => setForm({ ...form, projectName: e.target.value })} placeholder="e.g. Campus Connect" required autoFocus />
        </label>
        <label>GitHub repository
          <input type="url" value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} placeholder="https://github.com/you/project" required />
        </label>
        <label>Live demo <span className="optional">Optional</span>
          <input type="url" value={form.liveDemoUrl} onChange={(e) => setForm({ ...form, liveDemoUrl: e.target.value })} placeholder="https://your-project.com" />
        </label>
        <label>Tell us about it
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="What did you build? What would you like feedback on?" maxLength={500} required />
          <small>{form.description.length}/500</small>
        </label>
        {error && <div className="form-error" role="alert">{error}</div>}
        <div className="modal-actions">
          <button type="button" className="button button-ghost" onClick={onClose}>Cancel</button>
          <button className="button button-dark" disabled={loading}><Send size={15} /> {loading ? 'Submitting…' : 'Submit for review'}</button>
        </div>
      </form>
    </ModalShell>
  );
}

/* ---------------------------------------------------------------- review */
export function ReviewModal({
  submission, onClose, onReview,
}: {
  submission: Submission;
  onClose: () => void;
  onReview: (status: 'approved' | 'rejected', feedback: string) => Promise<void>;
}) {
  const [feedback, setFeedback] = useState(submission.feedback ?? '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const decide = async (status: 'approved' | 'rejected') => {
    if (status === 'rejected' && !feedback.trim()) {
      setError('Add a short note so the student knows what to change.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await onReview(status, feedback);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to save the review.');
      setLoading(false);
    }
  };

  return (
    <ModalShell onClose={onClose} className="review-modal">
      <div className="project-icon large"><Code2 size={20} /></div>
      <div className="eyebrow">Review project</div>
      <h2>{submission.projectName}</h2>
      <p className="modal-subtitle">
        {submission.studentName ? `Submitted by ${submission.studentName}. ` : ''}Leave a clear note that helps the student understand what to do next.
      </p>
      <label>Feedback <span className="optional">Required for changes requested</span>
        <textarea value={feedback} onChange={(e) => { setFeedback(e.target.value); setError(''); }} placeholder="What stood out? What could be stronger?" rows={5} />
      </label>
      {error && <div className="form-error" role="alert">{error}</div>}
      <div className="modal-actions">
        <button className="button button-soft" disabled={loading} onClick={() => decide('rejected')}>Request changes</button>
        <button className="button button-dark" disabled={loading} onClick={() => decide('approved')}><Check size={15} /> Approve project</button>
      </div>
    </ModalShell>
  );
}

/* ---------------------------------------------------------------- detail */
const feedbackTitle = {
  approved: { label: 'Mentor feedback · Approved', icon: CheckCircle2 },
  rejected: { label: 'Mentor feedback · Changes requested', icon: MessageSquareText },
  pending: { label: 'Awaiting review', icon: Clock },
} as const;

export function DetailModal({
  submission, isMentor, onClose, onReview,
}: {
  submission: Submission;
  isMentor: boolean;
  onClose: () => void;
  onReview: () => void;
}) {
  const { label, icon: Icon } = feedbackTitle[submission.status];
  const note =
    submission.feedback ||
    (submission.status === 'pending'
      ? isMentor ? 'This project is waiting for your decision.' : 'A mentor will review your project soon. You’ll see their feedback here.'
      : 'No written feedback was left for this review.');

  return (
    <ModalShell onClose={onClose} className="detail-modal">
      <div className="project-icon large"><Code2 size={20} /></div>
      <div className="eyebrow">Project details</div>
      <h2>{submission.projectName}</h2>
      <StatusBadge status={submission.status} />
      <div className="detail-grid">
        <div><span>Student</span><strong>{submission.studentName || 'You'}</strong></div>
        <div><span>Submitted</span><strong>{formatDate(submission.createdAt)}</strong></div>
        <div><span>Reviewer</span><strong>{submission.reviewerName || 'Not assigned yet'}</strong></div>
        <div><span>Reviewed</span><strong>{formatDate(submission.reviewedAt)}</strong></div>
      </div>
      <p className="detail-desc">{submission.description || 'No description provided.'}</p>
      <div className="detail-links">
        {submission.githubUrl && (
          <a className="button button-soft" href={submission.githubUrl} target="_blank" rel="noopener noreferrer"><Github size={15} /> Repository</a>
        )}
        {submission.liveDemoUrl && (
          <a className="button button-soft" href={submission.liveDemoUrl} target="_blank" rel="noopener noreferrer"><ExternalLink size={15} /> Live demo</a>
        )}
      </div>
      <div className={`feedback-box ${submission.status}`}>
        <strong><Icon size={14} /> {label}</strong>
        {note}
        {submission.reviewerName && submission.status !== 'pending' && <small>— {submission.reviewerName}</small>}
      </div>
      {isMentor && submission.status === 'pending' && (
        <div className="modal-actions">
          <button className="button button-dark" onClick={onReview}><Check size={15} /> Review this project</button>
        </div>
      )}
    </ModalShell>
  );
}
