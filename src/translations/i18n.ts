import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fa from "./locales/fa.json";

i18n.use(initReactI18next).init({
  resources: {
    fa: { translation: fa },
  },
  lng: "fa",
  fallbackLng: "fa",
  interpolation: { escapeValue: false },
});

export default i18n;
