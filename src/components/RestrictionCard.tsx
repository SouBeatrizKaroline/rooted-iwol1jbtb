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
    <div className="bg-card border border-border rounded-lg p-3 text-sm flex flex-col gap-2 shadow-subtle">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {severity === 'high' || severity === 'blocked' ? (
            <ShieldAlert className="w-4 h-4 text-destructive shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          )}
          <span className="font-semibold">{title}</span>
        </div>
        <Badge variant="outline" className="text-[10px] uppercase">
          {severity}
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
      <div className="flex items-center justify-between pt-1 border-t border-border text-[10px] text-muted-foreground">
        <span>Source: {source}</span>
        <div className="flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-primary" />
          <span className="capitalize">
            {dataClass} ({confidence})
          </span>
        </div>
      </div>
    </div>
  )
}
