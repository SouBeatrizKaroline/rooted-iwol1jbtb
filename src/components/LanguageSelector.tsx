import { Globe } from 'lucide-react'
import { useI18n } from '@/hooks/use-i18n'
import { Language } from '@/lib/i18n/translations'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

export function LanguageSelector() {
  const { language, setLanguage, units, setUnits } = useI18n()

  const labels: Record<Language, string> = {
    en: 'English (US)',
    es: 'Español',
    'pt-BR': 'Português (BR)',
  }

  return (
    <div className="flex items-center gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 text-xs text-emerald-100/80 hover:text-white"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>{labels[language]}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800 text-zinc-100">
          <DropdownMenuItem
            onClick={() => setLanguage('en')}
            className="hover:bg-zinc-800 cursor-pointer"
          >
            English (US)
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setLanguage('es')}
            className="hover:bg-zinc-800 cursor-pointer"
          >
            Español
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setLanguage('pt-BR')}
            className="hover:bg-zinc-800 cursor-pointer"
          >
            Português (BR)
          </DropdownMenuItem>
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
