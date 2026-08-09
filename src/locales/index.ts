import { translations } from '@/lib/i18n/translations'
import { LocaleCode, LOCALE_CONFIGS, DEFAULT_LOCALE } from '@/lib/i18n/config'

type TranslationDict = typeof translations.en

function deepMerge<T>(base: T, override: unknown): T {
  if (!override) return base
  if (typeof base !== 'object' || base === null) return (override ?? base) as T
  if (typeof override !== 'object' || override === null) return override as T
  const result: Record<string, unknown> = Array.isArray(base)
    ? [...(base as unknown[])]
    : { ...(base as Record<string, unknown>) }
  for (const key of Object.keys(override as Record<string, unknown>)) {
    const baseVal = result[key]
    const overrideVal = (override as Record<string, unknown>)[key]
    if (
      typeof baseVal === 'object' &&
      baseVal !== null &&
      typeof overrideVal === 'object' &&
      overrideVal !== null
    ) {
      result[key] = deepMerge(baseVal, overrideVal)
    } else if (overrideVal !== undefined) {
      result[key] = overrideVal
    }
  }
  return result as T
}

const cache: Partial<Record<LocaleCode, TranslationDict>> = {}

export function getTranslations(locale: LocaleCode): TranslationDict {
  if (cache[locale]) return cache[locale]!
  const config = LOCALE_CONFIGS[locale]
  const localeData = (translations as Record<string, TranslationDict>)[config.translationKey]
  if (!localeData || config.translationKey === 'en') {
    cache[locale] = translations.en
    return translations.en
  }
  const merged = deepMerge(translations.en, localeData)
  cache[locale] = merged
  return merged
}

export { translations, DEFAULT_LOCALE }
export type { LocaleCode }
