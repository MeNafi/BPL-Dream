import Link from 'next/link';
import { ArrowUpRight, Github, Mail } from 'lucide-react';
import { site } from '@/lib/site';
import { Logo } from './logo';

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/#features' },
      { label: 'How it works', href: '/#process' },
      { label: 'Live demo', href: '/#demo' },
    ],
  },
  {
    title: 'Workspace',
    links: [
      { label: 'Log in', href: '/login' },
      { label: 'Create account', href: '/signup' },
      { label: 'Mentor sign up', href: '/signup' },
    ],
  },
  {
    title: 'Project',
    links: [
      { label: 'About', href: '/#about' },
      { label: 'Source code', href: site.links.github, external: true },
      { label: 'Contact', href: site.links.email, external: true },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="logo-button" aria-label="Submity home"><Logo /></Link>
            <p>{site.tagline}</p>
            <div className="footer-social">
              <a href={site.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={16} /></a>
              <a href={site.links.email} aria-label="Email"><Mail size={16} /></a>
            </div>
          </div>
          {columns.map((column) => (
            <nav className="footer-col" key={column.title} aria-label={column.title}>
              <h4>{column.title}</h4>
              {column.links.map((link) =>
                'external' in link && link.external ? (
                  <a key={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                    {link.label}{link.href.startsWith('http') && <ArrowUpRight size={12} />}
                  </a>
                ) : (
                  <Link key={link.label} href={link.href}>{link.label}</Link>
                )
              )}
            </nav>
          ))}
        </div>

        <div className="footer-bottom">
          <span>© {site.year} Submity. Built for better feedback.</span>
          <span className="footer-stack">
            Built with {site.stack.map((item, index) => <span key={item}>{item}{index < site.stack.length - 1 ? ' · ' : ''}</span>)}
          </span>
        </div>
      </div>
      <div className="footer-wordmark" aria-hidden="true">submity.</div>
    </footer>
  );
}
