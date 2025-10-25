import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import './styles/globals.css';
import { AppWrapper } from '@/app/components/AppWrapper';
import { GlobalErrorHandler } from '@/app/components/GlobalErrorHandler';
import { locales } from '@/i18n';

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#1a1a1a" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect to Google Fonts for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google Fonts with display=swap for better UX */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        
        {/* Fallback Font Definition with metric overrides */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: 'Inter-Fallback';
                src: local('Arial');
                ascent-override: 90%;
                descent-override: 22%;
                line-gap-override: 0%;
                size-adjust: 107%;
              }
              
              @font-face {
                font-family: 'Roboto-Fallback';
                src: local('Helvetica Neue'), local('Arial');
                ascent-override: 92.7734%;
                descent-override: 24.4141%;
                line-gap-override: 0%;
                size-adjust: 100%;
              }
              
              html {
                font-family: 'Inter-Fallback', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
              }
              
              html.fonts-loaded {
                font-family: 'Inter', 'Inter-Fallback', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
              }
              
              html.fonts-failed {
                font-family: 'Inter-Fallback', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
              }
              
              @keyframes slide-up {
                from { transform: translateY(100%); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
              }
              
              .animate-slide-up {
                animation: slide-up 0.3s ease-out;
              }
            `,
          }}
        />
        
        {/* Font Loading Detection - Google Best Practice */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if ('fonts' in document) {
                  var timeout = setTimeout(function() {
                    if (!document.documentElement.classList.contains('fonts-loaded')) {
                      document.documentElement.classList.add('fonts-failed');
                      console.warn('⚠️ Google Fonts failed to load within 3s, using fallback');
                    }
                  }, 3000);
                  
                  Promise.all([
                    document.fonts.load('1em Inter'),
                    document.fonts.load('1em Roboto')
                  ]).then(function() {
                    clearTimeout(timeout);
                    document.documentElement.classList.add('fonts-loaded');
                  }).catch(function(err) {
                    clearTimeout(timeout);
                    document.documentElement.classList.add('fonts-failed');
                    console.error('❌ Google Fonts failed:', err);
                  });
                }
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppWrapper>
            {children}
          </AppWrapper>
          <GlobalErrorHandler />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}