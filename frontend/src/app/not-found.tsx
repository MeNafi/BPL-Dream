import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="page-loading" style={{ textAlign: 'center', padding: 24 }}>
      <div>
        <div className="eyebrow">404</div>
        <h1 style={{ margin: '12px 0 8px', fontSize: 36, letterSpacing: '-0.06em' }}>This page wandered off.</h1>
        <p style={{ margin: '0 0 24px', color: 'var(--muted-ink)' }}>The page you’re looking for doesn’t exist.</p>
        <Link className="button button-dark" href="/">Back to home</Link>
      </div>
    </main>
  );
}
