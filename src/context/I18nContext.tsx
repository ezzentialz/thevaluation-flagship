'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Locale, TranslationKeys } from '@/types';
import { translations } from '@/lib/translations';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationKeys;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('th');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('locale') as Locale | null;
    if (saved && (saved === 'th' || saved === 'en')) {
      setLocaleState(saved);
    } else if (typeof window !== 'undefined') {
      const browserLang = navigator.language.startsWith('th') ? 'th' : 'en';
      setLocaleState(browserLang);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale);
    }
  };

  if (!mounted) {
    return (
      <I18nContext.Provider value={{ locale: 'th', setLocale: () => {}, t: translations.th }}>
        {children}
      </I18nContext.Provider>
    );
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
