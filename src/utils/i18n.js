import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enDefault from "../locales/en.json";
import ruDefault from "../locales/ru.json";

import enMoscow from "../locales/enMoscow.json";
import ruMoscow from "../locales/ruMoscow.json";

const storedCity = localStorage.getItem("city") || "Makhachkala";
const storedLang = localStorage.getItem("i18nextLng") || "ru";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        Makhachkala: enDefault,
        Moscow: enMoscow,
      },
      ru: {
        Makhachkala: ruDefault,
        Moscow: ruMoscow,
      },
    },

    lng: storedLang,
    fallbackLng: "ru",

    ns: ["Makhachkala", "Moscow"],
    defaultNS: storedCity,

    detection: {
      order: ["querystring", "localStorage"],
      lookupQuerystring: "lng",
      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
