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
      classes: 'bg-primary/10 text-primary border-primary/20',
    },
    moderate: {
      label: 'Moderate Risk',
      icon: AlertTriangle,
      classes: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    high: {
      label: 'High Risk',
      icon: ShieldAlert,
      classes: 'bg-orange-50 text-orange-700 border-orange-200',
    },
    blocked: {
      label: 'Blocked',
      icon: Ban,
      classes: 'bg-destructive/10 text-destructive border-destructive/20',
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
