'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Menu, X, Zap } from 'lucide-react';
import { LogoLink } from './logo';

const links = [
  { href: '#features', label: 'Features' },
  { href: '#process', label: 'How it works' },
  { href: '#demo', label: 'Live demo' },
  { href: '#about', label: 'About' },
];

export function LandingNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="landing-header">
      <nav className="landing-nav page-shell" aria-label="Main navigation">
        <LogoLink />
        <div className="nav-links">
          {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </div>
        <div className="nav-actions">
          <Link className="button button-ghost" href="/login">Log in</Link>
          <a className="button button-outline" href="#demo"><Zap size={14} /> Try demo</a>
          <Link className="button button-dark" href="/signup">Get started <ArrowRight size={16} /></Link>
        </div>
        <button
          className="mobile-menu-button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open && (
        <div className="mobile-menu page-shell">
          {links.map((link) => <a key={link.href} href={link.href} onClick={close}>{link.label}</a>)}
          <div className="mobile-menu-actions">
            <Link className="button button-soft" href="/login" onClick={close}>Log in</Link>
            <a className="button button-outline" href="#demo" onClick={close}><Zap size={14} /> Try demo</a>
            <Link className="button button-dark" href="/signup" onClick={close}>Get started <ArrowRight size={16} /></Link>
          </div>
        </div>
      )}
    </header>
  );
}
