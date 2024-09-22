import React, { createContext, useState, useContext } from 'react';
import pt from './pt.json';
import ja from './ja.json';

const LocaleContext = createContext();

export const LocaleProvider = ({ children }) => {
  const list = [
    pt,
    ja
  ];

  const locales = {
    pt: pt,
    ja: ja
  };

  const [locale, setLocale] = useState(locales.pt);

  const changeLocale = (lang) => {
    setLocale(locales[lang] || locales.pt);
  };

  return (
    <LocaleContext.Provider value={{ locale, list, changeLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale= () => useContext(LocaleContext);
