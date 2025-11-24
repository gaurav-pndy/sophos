import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslation from "../locales/en.json";
import ruTranslation from "../locales/ru.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      ru: { translation: ruTranslation },
    },

    fallbackLng: "ru", // Default if nothing is detected

    detection: {
      order: ["querystring", "localStorage", "navigator"],
      lookupQuerystring: "lng",

      // VERY IMPORTANT → this makes "ru" the default
      caches: ["localStorage"],
      checkWhitelist: true,
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
