import { Check } from 'lucide-react'
import { useI18n } from '@/hooks/use-i18n'
import { LOCALE_CONFIGS, ALL_LOCALES, PHASE_1_LOCALES } from '@/lib/i18n/config'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

export function LanguageSelector() {
  const { language, setLanguage, units, setUnits } = useI18n()
  const config = LOCALE_CONFIGS[language]
  const upcomingLocales = ALL_LOCALES.filter((l) => LOCALE_CONFIGS[l].phase > 1)

  return (
    <div className="flex items-center gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 text-xs text-emerald-100/80 hover:text-white"
          >
            <span className="text-base leading-none">{config.flag}</span>
            <span className="hidden sm:inline">{config.label}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-zinc-900 border-zinc-800 text-zinc-100 max-h-[400px] overflow-y-auto w-48"
        >
          <DropdownMenuLabel className="text-[10px] text-zinc-500 uppercase tracking-wide">
            Complete
          </DropdownMenuLabel>
          {PHASE_1_LOCALES.map((code) => (
            <DropdownMenuItem
              key={code}
              onClick={() => setLanguage(code)}
              className="hover:bg-zinc-800 cursor-pointer gap-2"
            >
              <span className="text-base">{LOCALE_CONFIGS[code].flag}</span>
              <span className="flex-1">{LOCALE_CONFIGS[code].label}</span>
              {language === code && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator className="bg-zinc-800" />
          <DropdownMenuLabel className="text-[10px] text-zinc-500 uppercase tracking-wide">
            Coming Soon
          </DropdownMenuLabel>
          {upcomingLocales.map((code) => (
            <DropdownMenuItem
              key={code}
              onClick={() => setLanguage(code)}
              className="hover:bg-zinc-800 cursor-pointer gap-2 opacity-50"
            >
              <span className="text-base">{LOCALE_CONFIGS[code].flag}</span>
              <span className="flex-1">{LOCALE_CONFIGS[code].label}</span>
              {language === code && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="outline"
        size="sm"
        className="h-7 text-[10px] px-2 border-emerald-800/40 bg-emerald-950/20 text-emerald-300"
        onClick={() => setUnits(units === 'us' ? 'metric' : 'us')}
      >
        {units.toUpperCase()}
      </Button>
    </div>
  )
}
