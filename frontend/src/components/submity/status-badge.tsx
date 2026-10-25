import type { SubmissionStatus } from '@/lib/api-client';

const config: Record<SubmissionStatus, { label: string; className: string }> = {
  pending: { label: 'In review', className: 'status-pending' },
  approved: { label: 'Approved', className: 'status-approved' },
  rejected: { label: 'Changes requested', className: 'status-rejected' },
};

export function StatusBadge({ status }: { status: SubmissionStatus }) {
  const { label, className } = config[status];
  return (
    <span className={`status-badge ${className}`}>
      <span className="status-dot" />
      {label}
    </span>
  );
}
