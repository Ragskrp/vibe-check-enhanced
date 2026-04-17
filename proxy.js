import { NextResponse } from 'next/server';

export function proxy(request) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host');

  // If host starts with 'www.', redirect to the non-www version
  if (host && host.startsWith('www.')) {
    const newHost = host.replace(/^www\./, '');
    url.host = newHost;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

// Only run on standard pages, not static assets or API routes
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.js|.*\\.txt).*)'],
};
