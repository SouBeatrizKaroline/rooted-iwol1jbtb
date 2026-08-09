import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, Language } from '@/lib/i18n/translations'

export type Units = 'us' | 'metric'

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  units: Units
  setUnits: (units: Units) => void
  t: (typeof translations)['en']
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export const useI18n = () => {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used within I18nProvider')
  return context
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('rooted_lang') as Language) || 'pt-BR'
  })
  const [units, setUnitsState] = useState<Units>(() => {
    return (localStorage.getItem('rooted_units') as Units) || 'us'
  })

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('rooted_lang', lang)
  }

  const setUnits = (u: Units) => {
    setUnitsState(u)
    localStorage.setItem('rooted_units', u)
  }

  const t = translations[language] || translations.en

  return (
    <I18nContext.Provider value={{ language, setLanguage, units, setUnits, t }}>
      {children}
    </I18nContext.Provider>
  )
}
