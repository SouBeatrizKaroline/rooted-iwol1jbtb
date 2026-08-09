import { AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface RestrictionCardProps {
  title: string
  description: string
  severity: 'low' | 'moderate' | 'high' | 'blocked'
  source?: string
  confidence?: string
  dataClass?: string
}

export function RestrictionCard({
  title,
  description,
  severity,
  source = 'State DOT - Demo',
  confidence = 'high',
  dataClass = 'verified',
}: RestrictionCardProps) {
  return (
    <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-3 text-sm flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {severity === 'high' || severity === 'blocked' ? (
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          )}
          <span className="font-semibold text-zinc-100">{title}</span>
        </div>
        <Badge variant="outline" className="text-[10px] uppercase border-zinc-700 text-zinc-400">
          {severity}
        </Badge>
      </div>

      <p className="text-xs text-zinc-400">{description}</p>

      <div className="flex items-center justify-between pt-1 border-t border-zinc-800/60 text-[10px] text-zinc-500">
        <span>Source: {source}</span>
        <div className="flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
          <span className="capitalize">
            {dataClass} ({confidence})
          </span>
        </div>
      </div>
    </div>
  )
}
