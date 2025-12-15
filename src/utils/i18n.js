import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enDefault from "../locales/en.json";
import ruDefault from "../locales/ru.json";

import enMoscow from "../locales/enMoscow.json";
import ruMoscow from "../locales/ruMoscow.json";

// Get stored city OR fallback
const city = localStorage.getItem("city") || "Makhachkala";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: city === "Moscow" ? enMoscow : enDefault,
      },
      ru: {
        translation: city === "Moscow" ? ruMoscow : ruDefault,
      },
    },

    fallbackLng: "ru",

    detection: {
      order: ["querystring", "localStorage"],
      lookupQuerystring: "lng",
      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
