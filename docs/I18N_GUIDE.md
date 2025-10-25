
# Internationalization (i18n) Guide

## Overview

Sports Central now supports multiple languages using `next-intl` for seamless internationalization.

## Supported Languages

- 🇬🇧 English (en) - Default
- 🇪🇸 Spanish (es)
- 🇫🇷 French (fr)
- 🇩🇪 German (de)
- 🇵🇹 Portuguese (pt)

## Translation Coverage

Current coverage: **~65%** of core screens

### Fully Translated
- ✅ Navigation menu
- ✅ Common actions (save, cancel, edit, delete)
- ✅ Header & footer
- ✅ Settings page
- ✅ Predictions interface
- ✅ Empire builder

### Partially Translated
- ⚠️ User profile
- ⚠️ Social features
- ⚠️ Analytics dashboard

### Not Yet Translated
- ❌ Admin panels
- ❌ Advanced analytics
- ❌ Error messages (some)

## How to Use Translations in Components

```tsx
'use client';
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('common');
  
  return <button>{t('save')}</button>;
}
```

## Adding New Languages

1. Create new translation file: `apps/frontend/src/messages/{locale}.json`
   - Replace `{locale}` with the language code (e.g., `de.json`, `it.json`)
   - Copy structure from `apps/frontend/src/messages/en.json`
2. Add locale to `apps/frontend/src/i18n.ts`:
   ```ts
   export const locales = ['en', 'es', 'fr', 'de', 'pt', 'it'] as const;
   export const localeNames = {
     en: 'English',
     es: 'Español',
     fr: 'Français',
     de: 'Deutsch',
     pt: 'Português',
     it: 'Italiano' // new language
   };
   ```
3. Add flag emoji to LanguageSwitcher component

## Adding New Translations

1. Add key to all language files in `apps/frontend/src/messages/`
   - Update: `en.json`, `es.json`, `fr.json`, `de.json`, `pt.json`
2. Use in component: `t('newKey')`
   ```tsx
   import { useTranslations } from 'next-intl';
   
   const t = useTranslations('common');
   return <button>{t('newKey')}</button>;
   ```

## Language Detection

The app automatically detects user language from:
1. URL prefix (e.g., `/es/predictions`)
2. Browser's Accept-Language header
3. Stored preference in localStorage
4. Falls back to English

## Testing

```bash
# Test English (default)
http://localhost:5000

# Test Spanish
http://localhost:5000/es

# Test French
http://localhost:5000/fr
```

## Roadmap

- [ ] Arabic (RTL support)
- [ ] Portuguese
- [ ] German
- [ ] Italian
- [ ] Chinese
- [ ] Japanese
