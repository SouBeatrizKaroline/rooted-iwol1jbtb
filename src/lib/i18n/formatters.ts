import { LocaleCode, getLocaleConfig, Currency, Units, TempUnit } from '@/lib/i18n/config'

function intlLocale(locale: LocaleCode): string {
  return locale === 'en-US' ? 'en-US' : getLocaleConfig(locale).translationKey
}

export function formatDate(date: Date | string, locale: LocaleCode): string {
  const d = typeof date === 'string' ? new Date(date) : date
  if (isNaN(d.getTime())) return ''
  return new Intl.DateTimeFormat(intlLocale(locale), {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d)
}

export function formatTime(date: Date | string, locale: LocaleCode): string {
  const d = typeof date === 'string' ? new Date(date) : date
  if (isNaN(d.getTime())) return ''
  return new Intl.DateTimeFormat(intlLocale(locale), {
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

export function formatCurrency(amount: number, currency: Currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatNumber(value: number, locale: LocaleCode): string {
  return new Intl.NumberFormat(intlLocale(locale)).format(value)
}

export function formatWeight(lbs: number, units: Units): string {
  if (units === 'metric') {
    const kg = lbs * 0.453592
    return kg >= 1000 ? `${(kg / 1000).toFixed(1)} t` : `${Math.round(kg)} kg`
  }
  return lbs >= 2000 ? `${(lbs / 2000).toFixed(1)} tons` : `${Math.round(lbs)} lb`
}

export function formatDistance(miles: number, units: Units): string {
  return units === 'metric' ? `${(miles * 1.60934).toFixed(1)} km` : `${miles.toFixed(1)} mi`
}

export function formatTemperature(fahrenheit: number, tempUnit: TempUnit): string {
  return tempUnit === 'C'
    ? `${Math.round(((fahrenheit - 32) * 5) / 9)}°C`
    : `${Math.round(fahrenheit)}°F`
}
