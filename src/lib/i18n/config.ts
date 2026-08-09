import pb from '@/lib/pocketbase/client'

export type LocaleCode =
  | 'en-US'
  | 'es'
  | 'pt-BR'
  | 'it'
  | 'fr'
  | 'de'
  | 'ru'
  | 'zh-CN'
  | 'ja'
  | 'ko'
  | 'hi'
  | 'ar'

export type Units = 'us' | 'metric'
export type Currency =
  | 'USD'
  | 'EUR'
  | 'BRL'
  | 'GBP'
  | 'CAD'
  | 'INR'
  | 'JPY'
  | 'CNY'
  | 'RUB'
  | 'KRW'
  | 'SAR'
export type TempUnit = 'F' | 'C'

export interface LocaleConfig {
  code: LocaleCode
  label: string
  flag: string
  rtl: boolean
  speechCode: string
  defaultUnits: Units
  defaultCurrency: Currency
  dateFormat: string
  tempUnit: TempUnit
  phase: 1 | 2 | 3 | 4
  translationKey: string
  signLanguageSupport: string[]
}

export const DEFAULT_LOCALE: LocaleCode = 'en-US'

export const LOCALE_CONFIGS: Record<LocaleCode, LocaleConfig> = {
  'en-US': {
    code: 'en-US',
    label: 'English',
    flag: '🇺🇸',
    rtl: false,
    speechCode: 'en-US',
    defaultUnits: 'us',
    defaultCurrency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    tempUnit: 'F',
    phase: 1,
    translationKey: 'en',
    signLanguageSupport: ['ASL'],
  },
  es: {
    code: 'es',
    label: 'Español',
    flag: '🇪🇸',
    rtl: false,
    speechCode: 'es-ES',
    defaultUnits: 'metric',
    defaultCurrency: 'EUR',
    dateFormat: 'DD/MM/YYYY',
    tempUnit: 'C',
    phase: 1,
    translationKey: 'es',
    signLanguageSupport: ['LSE'],
  },
  'pt-BR': {
    code: 'pt-BR',
    label: 'Português',
    flag: '🇧🇷',
    rtl: false,
    speechCode: 'pt-BR',
    defaultUnits: 'metric',
    defaultCurrency: 'BRL',
    dateFormat: 'DD/MM/YYYY',
    tempUnit: 'C',
    phase: 1,
    translationKey: 'pt-BR',
    signLanguageSupport: ['VLibras'],
  },
  it: {
    code: 'it',
    label: 'Italiano',
    flag: '🇮🇹',
    rtl: false,
    speechCode: 'it-IT',
    defaultUnits: 'metric',
    defaultCurrency: 'EUR',
    dateFormat: 'DD/MM/YYYY',
    tempUnit: 'C',
    phase: 2,
    translationKey: 'en',
    signLanguageSupport: ['LIS'],
  },
  fr: {
    code: 'fr',
    label: 'Français',
    flag: '🇫🇷',
    rtl: false,
    speechCode: 'fr-FR',
    defaultUnits: 'metric',
    defaultCurrency: 'EUR',
    dateFormat: 'DD/MM/YYYY',
    tempUnit: 'C',
    phase: 2,
    translationKey: 'en',
    signLanguageSupport: ['LSF'],
  },
  de: {
    code: 'de',
    label: 'Deutsch',
    flag: '🇩🇪',
    rtl: false,
    speechCode: 'de-DE',
    defaultUnits: 'metric',
    defaultCurrency: 'EUR',
    dateFormat: 'DD.MM.YYYY',
    tempUnit: 'C',
    phase: 2,
    translationKey: 'en',
    signLanguageSupport: ['DGS'],
  },
  ru: {
    code: 'ru',
    label: 'Русский',
    flag: '🇷🇺',
    rtl: false,
    speechCode: 'ru-RU',
    defaultUnits: 'metric',
    defaultCurrency: 'RUB',
    dateFormat: 'DD.MM.YYYY',
    tempUnit: 'C',
    phase: 3,
    translationKey: 'en',
    signLanguageSupport: [],
  },
  'zh-CN': {
    code: 'zh-CN',
    label: '中文',
    flag: '🇨🇳',
    rtl: false,
    speechCode: 'zh-CN',
    defaultUnits: 'metric',
    defaultCurrency: 'CNY',
    dateFormat: 'YYYY/MM/DD',
    tempUnit: 'C',
    phase: 3,
    translationKey: 'en',
    signLanguageSupport: [],
  },
  ja: {
    code: 'ja',
    label: '日本語',
    flag: '🇯🇵',
    rtl: false,
    speechCode: 'ja-JP',
    defaultUnits: 'metric',
    defaultCurrency: 'JPY',
    dateFormat: 'YYYY/MM/DD',
    tempUnit: 'C',
    phase: 3,
    translationKey: 'en',
    signLanguageSupport: ['JSL'],
  },
  ko: {
    code: 'ko',
    label: '한국어',
    flag: '🇰🇷',
    rtl: false,
    speechCode: 'ko-KR',
    defaultUnits: 'metric',
    defaultCurrency: 'KRW',
    dateFormat: 'YYYY.MM.DD',
    tempUnit: 'C',
    phase: 3,
    translationKey: 'en',
    signLanguageSupport: ['KSL'],
  },
  hi: {
    code: 'hi',
    label: 'हिन्दी',
    flag: '🇮🇳',
    rtl: false,
    speechCode: 'hi-IN',
    defaultUnits: 'metric',
    defaultCurrency: 'INR',
    dateFormat: 'DD/MM/YYYY',
    tempUnit: 'C',
    phase: 3,
    translationKey: 'en',
    signLanguageSupport: ['ISL'],
  },
  ar: {
    code: 'ar',
    label: 'العربية',
    flag: '🇸🇦',
    rtl: true,
    speechCode: 'ar-SA',
    defaultUnits: 'metric',
    defaultCurrency: 'SAR',
    dateFormat: 'DD/MM/YYYY',
    tempUnit: 'C',
    phase: 3,
    translationKey: 'en',
    signLanguageSupport: [],
  },
}

export const ALL_LOCALES = Object.keys(LOCALE_CONFIGS) as LocaleCode[]
export const PHASE_1_LOCALES = ALL_LOCALES.filter((l) => LOCALE_CONFIGS[l].phase === 1)

export function getLocaleConfig(code: string): LocaleConfig {
  return LOCALE_CONFIGS[code as LocaleCode] || LOCALE_CONFIGS[DEFAULT_LOCALE]
}

export function resolveBrowserLocale(): LocaleCode {
  if (typeof navigator === 'undefined') return DEFAULT_LOCALE
  const browserLang = (navigator.language || navigator.languages?.[0] || '').toLowerCase()
  for (const [code, config] of Object.entries(LOCALE_CONFIGS)) {
    const patterns = [
      code.toLowerCase(),
      config.translationKey.toLowerCase(),
      config.speechCode.toLowerCase(),
    ]
    if (patterns.some((p) => browserLang.startsWith(p))) return code as LocaleCode
  }
  if (browserLang.startsWith('pt')) return 'pt-BR'
  return DEFAULT_LOCALE
}

export function resolveAuthLocale(): LocaleCode | null {
  if (pb.authStore.isValid && pb.authStore.record) {
    const userLang = (pb.authStore.record as Record<string, unknown>)?.language as
      | string
      | undefined
    if (userLang) {
      for (const [code, config] of Object.entries(LOCALE_CONFIGS)) {
        if (config.translationKey === userLang) return code as LocaleCode
      }
    }
  }
  return null
}
