import React, { createContext, useContext, useState } from 'react';
import translations, { Lang, TranslationKey } from '../i18n/translations';

const STORAGE_KEY = 'stn_lang';

function detectDefaultLang(): Lang {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved === 'ru' || saved === 'en') return saved;
    return navigator.language?.startsWith('ru') ? 'ru' : 'en';
}

export interface LanguageContextValue {
    lang: Lang;
    setLang: (lang: Lang) => void;
    t: (key: TranslationKey) => string;
}

export const LanguageContext = createContext<LanguageContextValue>({
    lang: 'en',
    setLang: () => {},
    t: (key) => key as string,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = useState<Lang>(detectDefaultLang);

    const setLang = (newLang: Lang) => {
        localStorage.setItem(STORAGE_KEY, newLang);
        setLangState(newLang);
    };

    const t = (key: TranslationKey): string =>
        translations[lang][key] as string;

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage(): LanguageContextValue {
    return useContext(LanguageContext);
}

