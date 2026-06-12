import React, { createContext, useContext, useState } from 'react';
import translations from '../translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem('rpi_lang') || 'kh');

  const toggle = () => {
    const next = lang === 'kh' ? 'en' : 'kh';
    setLang(next);
    localStorage.setItem('rpi_lang', next);
  };

  const t = (key) => translations[lang]?.[key] ?? translations.kh[key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
