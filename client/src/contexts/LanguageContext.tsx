import { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.academics": "Academics",
    "nav.admissions": "Admissions",
    "nav.activities": "Activities",
    "nav.events": "Events",
    "nav.gallery": "Gallery",
    "nav.achievements": "Achievements",
    "nav.contact": "Contact",
    "header.tagline": "Excellence in Education",
    "header.admissions": "Admissions",
    "header.careers": "Careers",
    "header.erp": "ERP Login",
  },
  hi: {
    // Header (Hindi translations)
    "nav.home": "होम",
    "nav.about": "हमारे बारे में",
    "nav.academics": "शैक्षणिक",
    "nav.admissions": "प्रवेश",
    "nav.activities": "गतिविधियाँ",
    "nav.events": "कार्यक्रम",
    "nav.gallery": "गैलरी",
    "nav.achievements": "उपलब्धियां",
    "nav.contact": "संपर्क करें",
    "header.tagline": "शिक्षा में उत्कृष्टता",
    "header.admissions": "प्रवेश",
    "header.careers": "करियर",
    "header.erp": "ईआरपी लॉगिन",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem("language") as Language;
    return stored || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
