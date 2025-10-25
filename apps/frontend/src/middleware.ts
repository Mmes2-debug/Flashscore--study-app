
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip middleware for static files, API routes, and special Next.js paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // Get locale from cookie or accept-language header
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  const acceptLanguage = request.headers.get('accept-language');
  
  // Determine locale (default to 'en')
  let locale = 'en';
  if (cookieLocale && ['en', 'es', 'fr', 'de', 'pt'].includes(cookieLocale)) {
    locale = cookieLocale;
  } else if (acceptLanguage) {
    const browserLang = acceptLanguage.split(',')[0].split('-')[0];
    if (['es', 'fr', 'de', 'pt'].includes(browserLang)) {
      locale = browserLang;
    }
  }

  // If pathname doesn't have locale, redirect to add it
  const pathnameHasLocale = ['en', 'es', 'fr', 'de', 'pt'].some(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
  );

  if (!pathnameHasLocale) {
    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    newUrl.search = request.nextUrl.search;
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|static|.*\\..*).*)']
};
