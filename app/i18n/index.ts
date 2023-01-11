import i18n from 'i18next';
import {
  initReactI18next,
  withTranslation,
  useTranslation,
  TFunction,
} from 'react-i18next';
import en from './translations/en.json';

const resources = {
  en: {translation: en},
};

const t: TFunction = i18n.t.bind(i18n);

function tf(key: string, parameters?: Record<string, string>) {
  let result = t(key);

  if (!parameters) return result;

  Object.keys(parameters).forEach(key => {
    result = result.replace(`{${key}}`, parameters[key]);
  });

  return result;
}

const translation: Promise<TFunction> = i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'en',
  keySeparator: '.',
  interpolation: {
    escapeValue: false,
  },
});

export {t, tf, withTranslation, useTranslation, TFunction};

export default translation;
