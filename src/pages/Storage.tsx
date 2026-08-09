import { useEffect, useState } from 'react'
import { Warehouse } from 'lucide-react'
import { getStorageFacilities, StorageFacility } from '@/services/storage'
import { RiskBadge } from '@/components/RiskBadge'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/hooks/use-i18n'

export default function Storage() {
  const { t } = useI18n()
  const [facilities, setFacilities] = useState<StorageFacility[]>([])

  useEffect(() => {
    getStorageFacilities().then(setFacilities).catch(console.error)
  }, [])

  return (
    <div className="space-y-6 py-2">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white">{t.storage.title}</h1>
        <p className="text-xs text-zinc-400">{t.storage.subtitle}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {facilities.map((f) => (
          <div key={f.id} className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl space-y-3">
            <div className="flex items-start justify-between">
              <Warehouse className="w-6 h-6 text-emerald-400" />
              <Badge
                variant="outline"
                className="text-[10px] uppercase border-emerald-800 text-emerald-400"
              >
                {f.facility_type}
              </Badge>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-100 text-sm">{f.name}</h3>
              <p className="text-xs text-zinc-400">
                {f.distance_miles} {t.storage.distance} • {t.storage.fee}: ${f.fee_per_bushel}
                {t.storage.perBushelDay}
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-zinc-300">
                <span>{t.storage.capacity}</span>
                <span className="font-bold text-amber-400">{f.capacity_pct}%</span>
              </div>
              <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-800">
                <div
                  className={`h-full ${f.capacity_pct > 85 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                  style={{ width: `${f.capacity_pct}%` }}
                />
              </div>
            </div>
            <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs">
              <span className="text-zinc-400">{t.storage.transportRisk}</span>
              <RiskBadge level={f.transport_risk === 'high' ? 'high' : 'low'} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
