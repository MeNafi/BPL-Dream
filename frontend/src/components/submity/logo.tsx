import Link from 'next/link';

// Main Submity brand logo component with compact option
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="brand-mark">
      {/* Bright, vibrant icon mark */}
      <span className="brand-symbol">S</span>
      
      {/* Brand text displayed when not in compact mode */}
      {!compact && (
        <span className="brand-name">
          submity<span>.</span>
        </span>
      )}
    </span>
  );
}

// Clickable logo component wrapping the main logo with home page link
export function LogoLink() {
  return (
    <Link href="/" className="logo-button" aria-label="Submity home">
      <Logo />
    </Link>
  );
}