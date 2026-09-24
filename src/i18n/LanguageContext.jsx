import { createContext, useCallback, useContext, useEffect, useState } from "react";
import translations from "./translations";

const LanguageContext = createContext();

const SUPPORTED_LANGUAGES = ["fr", "en"];
const STORAGE_KEY = "irica_lang";
const DEFAULT_LANGUAGE = "fr";

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (SUPPORTED_LANGUAGES.includes(stored)) {
        return stored;
      }
    }
    return DEFAULT_LANGUAGE;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, language);
    }
  }, [language]);

  const setLanguage = useCallback((lang) => {
    if (SUPPORTED_LANGUAGES.includes(lang)) {
      setLanguageState(lang);
    }
  }, []);

  const t = useCallback(
    (key, params) => {
      const dict = translations[language] || {};
      const value = key
        .split(".")
        .reduce((acc, k) => (acc == null ? acc : acc[k]), dict);

      let result = typeof value === "string" ? value : key;

      if (params && typeof params === "object") {
        result = result.replace(/\{(\w+)\}/g, (_, k) =>
          params[k] != null ? String(params[k]) : `{${k}}`
        );
      }

      return result;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export default LanguageContext;
