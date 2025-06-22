import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)   
  .use(initReactI18next)      
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'uk'],
    resources: {
      en: { common: (await import('../locales/en/common.json')).default },
      uk: { common: (await import('../locales/uk/common.json')).default },
    },
    ns: ['common'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
  });

export default i18n;
