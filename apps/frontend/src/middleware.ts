
import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'es', 'fr', 'de', 'pt'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip static assets and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Detect locale: cookie > accept-language > default
  let locale = defaultLocale;
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  
  if (cookieLocale && locales.includes(cookieLocale)) {
    locale = cookieLocale;
  } else {
    const acceptLang = request.headers.get('accept-language');
    if (acceptLang) {
      const detected = acceptLang.split(',')[0].split('-')[0];
      if (locales.includes(detected)) {
        locale = detected;
      }
    }
  }

  // Redirect to localized path
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|static|.*\\..*).*)']
};
