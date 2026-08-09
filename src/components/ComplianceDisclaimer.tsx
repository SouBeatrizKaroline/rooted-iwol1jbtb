import { ShieldCheck } from 'lucide-react'
import { useI18n } from '@/hooks/use-i18n'

export function ComplianceDisclaimer() {
  const { t } = useI18n()
  return (
    <div className="bg-primary/5 border border-primary/15 rounded-lg p-3 text-xs text-foreground/70 flex items-start gap-2.5 my-4">
      <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold text-primary mb-0.5">{t.compliance}</p>
        <p className="text-[11px] text-muted-foreground">
          Rooted provides route intelligence as decision support. Operating decisions remain the
          driver and carrier's responsibility.
        </p>
      </div>
    </div>
  )
}
