import { NextResponse, type NextRequest } from 'next/server';

/**
 * Next.js 16 "proxy" (the successor of middleware.ts).
 * Adds a few safe security headers to every page response.
 */
export function proxy(request: NextRequest) {
  void request;
  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  return response;
}
 
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.svg).*)'],
};
