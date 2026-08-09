import { Info } from 'lucide-react'

export function DemoBanner() {
  return (
    <div className="bg-amber-500/10 border-b border-amber-500/30 text-amber-300 text-xs py-1.5 px-4 text-center flex items-center justify-center gap-2 font-medium">
      <Info className="w-3.5 h-3.5 shrink-0" />
      <span>DEMO MODE — Using simulated agricultural logistics data</span>
    </div>
  )
}
