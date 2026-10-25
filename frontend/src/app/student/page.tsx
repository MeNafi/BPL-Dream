import type { Metadata } from 'next';
import { Workspace } from '@/components/submity/workspace';

export const metadata: Metadata = { title: 'Student workspace' };

export default function StudentPage() {
  return <Workspace role="student" />;
}
