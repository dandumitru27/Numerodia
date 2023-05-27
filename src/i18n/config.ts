import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import translation from './translation.json';
import translationRO from './translationRO.json';

export const resources = {
  en: {
    translation,
  },
  ro: {
    translation: translationRO,
  }
};

i18next.use(initReactI18next).init({
  lng: 'en',
  resources,
  interpolation: {
    escapeValue: false
  }
});