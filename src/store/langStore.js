import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import en from '../i18n/en';
import ar from '../i18n/ar';

const locales = { en, ar };

const useLangStore = create(
  persist(
    (set, get) => ({
      locale: 'en',
      t: en,

      setLocale: (locale) => {
        const translations = locales[locale] || en;
        document.documentElement.setAttribute('dir', translations.dir);
        document.documentElement.setAttribute('lang', translations.lang);
        set({ locale, t: translations });
      },

      toggleLocale: () => {
        const newLocale = get().locale === 'en' ? 'ar' : 'en';
        get().setLocale(newLocale);
      },

      initLang: () => {
        const locale = get().locale;
        const translations = locales[locale] || en;
        document.documentElement.setAttribute('dir', translations.dir);
        document.documentElement.setAttribute('lang', translations.lang);
        set({ t: translations });
      },
    }),
    {
      name: 'rimal-lang',
      partialize: (state) => ({ locale: state.locale }),
    }
  )
);

export default useLangStore;
