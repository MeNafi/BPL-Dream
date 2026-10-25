import type { Metadata } from 'next';
import { Workspace } from '@/components/submity/workspace';

export const metadata: Metadata = { title: 'Mentor workspace' };

export default function MentorPage() {
  return <Workspace role="mentor" />;
}
