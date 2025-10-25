
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'es', 'fr', 'de', 'pt'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  pt: 'Português'
};

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) || 'en';
  const validLocale = locales.includes(locale as Locale) ? locale : 'en';

  // Lazy load messages only when needed
  const messages = await import(`./messages/${validLocale}.json`).then(m => m.default);
  
  return {
    locale: validLocale,
    messages,
    timeZone: 'UTC',
    now: new Date()
  };
});
