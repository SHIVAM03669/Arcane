import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
export const LanguageContext = createContext();

// Create a custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Create the provider component
export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState(() => {
    // Get initial language from localStorage or default to 'en'
    const savedLang = localStorage.getItem('language');
    return savedLang || 'en';
  });

  useEffect(() => {
    // Save language to localStorage whenever it changes
    localStorage.setItem('language', currentLang);
  }, [currentLang]);

  const changeLanguage = (lang) => {
    setCurrentLang(lang);
  };

  const value = {
    currentLang,
    changeLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}; 