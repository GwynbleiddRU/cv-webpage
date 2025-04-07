import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import enTranslation from "./locales/en/translation.json";
import ruTranslation from "./locales/ru/translation.json";

// i18n Configuration
i18n
    .use(LanguageDetector) // Automatically detects user's language
    .use(initReactI18next) // Enables react-i18next
    .init({
        resources: {
            en: { translation: enTranslation },
            ru: { translation: ruTranslation },
        },
        fallbackLng: "en", // Default language
        interpolation: { escapeValue: false }, // React handles escaping
        detection: {
            order: ["localStorage", "navigator"],
            caches: ["localStorage"],
        },
        returnObjects: true
    });

export default i18n;
