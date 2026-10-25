import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/components/submity/auth-provider';
import { ToastProvider } from '@/components/submity/toast-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: { default: 'Submity', template: '%s · Submity' },
  description: 'Submit projects, track progress, and get feedback that moves work forward.',
};

export const viewport: Viewport = { themeColor: '#f7faf8' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <ToastProvider>
          <AuthProvider>{children}</AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
