import { useLanguage } from '../context/LanguageContext';
import { languages } from '../translations/translations';

export const useTranslation = () => {
  const { currentLang } = useLanguage();

  const t = (key) => {
    const keys = key.split('.');
    let translation = languages[currentLang];
    
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    return translation;
  };

  return { t, currentLang };
}; 