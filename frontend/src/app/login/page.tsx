import type { Metadata } from 'next';
import { AuthPage } from '@/components/submity/auth-page';

export const metadata: Metadata = { title: 'Log in' };

export default function LoginPage() {
  return <AuthPage mode="login" />;
}
