import { ShieldCheck } from 'lucide-react'
import { useI18n } from '@/hooks/use-i18n'

export function ComplianceDisclaimer() {
  const { t } = useI18n()

  return (
    <div className="bg-emerald-950/40 border border-emerald-800/30 rounded-lg p-3 text-xs text-emerald-200/80 flex items-start gap-2.5 my-4">
      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold text-emerald-300 mb-0.5">{t.compliance}</p>
        <p className="text-[11px] text-emerald-400/70">
          Rooted provides route intelligence as decision support. Operating decisions remain the
          driver and carrier's responsibility.
        </p>
      </div>
    </div>
  )
}
