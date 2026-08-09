import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { translations } from '@/lib/i18n/translations'
import { getTranslations } from '@/locales'
import {
  LocaleCode,
  DEFAULT_LOCALE,
  LOCALE_CONFIGS,
  getLocaleConfig,
  resolveBrowserLocale,
  resolveAuthLocale,
  Units,
  Currency,
  TempUnit,
} from '@/lib/i18n/config'

type TranslationDict = typeof translations.en

interface I18nContextType {
  language: LocaleCode
  setLanguage: (lang: LocaleCode) => void
  units: Units
  setUnits: (units: Units) => void
  currency: Currency
  setCurrency: (c: Currency) => void
  tempUnit: TempUnit
  setTempUnit: (u: TempUnit) => void
  t: TranslationDict
  isRTL: boolean
  localeConfig: ReturnType<typeof getLocaleConfig>
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export const useI18n = () => {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used within I18nProvider')
  return context
}

function resolveInitialLocale(): LocaleCode {
  const saved = localStorage.getItem('rooted_lang') as LocaleCode | null
  if (saved && LOCALE_CONFIGS[saved]) return saved
  const authLocale = resolveAuthLocale()
  if (authLocale) return authLocale
  return resolveBrowserLocale()
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LocaleCode>(() => resolveInitialLocale())
  const localeConfig = getLocaleConfig(language)

  const [units, setUnitsState] = useState<Units>(
    () => (localStorage.getItem('rooted_units') as Units) || localeConfig.defaultUnits,
  )
  const [currency, setCurrencyState] = useState<Currency>(
    () => (localStorage.getItem('rooted_currency') as Currency) || localeConfig.defaultCurrency,
  )
  const [tempUnit, setTempUnitState] = useState<TempUnit>(
    () => (localStorage.getItem('rooted_temp') as TempUnit) || localeConfig.tempUnit,
  )

  const setLanguage = useCallback((lang: LocaleCode) => {
    setLanguageState(lang)
    localStorage.setItem('rooted_lang', lang)
  }, [])

  const setUnits = useCallback((u: Units) => {
    setUnitsState(u)
    localStorage.setItem('rooted_units', u)
  }, [])

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c)
    localStorage.setItem('rooted_currency', c)
  }, [])

  const setTempUnit = useCallback((u: TempUnit) => {
    setTempUnitState(u)
    localStorage.setItem('rooted_temp', u)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.lang = language
    root.dir = localeConfig.rtl ? 'rtl' : 'ltr'
  }, [language, localeConfig.rtl])

  const t = getTranslations(language)
  const isRTL = localeConfig.rtl

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        units,
        setUnits,
        currency,
        setCurrency,
        tempUnit,
        setTempUnit,
        t,
        isRTL,
        localeConfig,
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}

export type { LocaleCode, Units, Currency, TempUnit }
