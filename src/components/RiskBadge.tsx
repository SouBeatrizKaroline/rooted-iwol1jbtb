import { ShieldAlert, ShieldCheck, AlertTriangle, Ban } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RiskBadgeProps {
  level: 'low' | 'moderate' | 'high' | 'blocked'
  className?: string
}

export function RiskBadge({ level, className }: RiskBadgeProps) {
  const configs = {
    low: {
      label: 'Low Risk',
      icon: ShieldCheck,
      classes: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
    moderate: {
      label: 'Moderate Risk',
      icon: AlertTriangle,
      classes: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    },
    high: {
      label: 'High Risk',
      icon: ShieldAlert,
      classes: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    },
    blocked: {
      label: 'Blocked',
      icon: Ban,
      classes: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    },
  }

  const config = configs[level] || configs.low
  const Icon = config.icon

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border',
        config.classes,
        className,
      )}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span>{config.label}</span>
    </span>
  )
}
