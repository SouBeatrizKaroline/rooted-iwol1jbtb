import { useEffect, useState } from 'react'
import { Warehouse } from 'lucide-react'
import { getStorageFacilities, StorageFacility } from '@/services/storage'
import { RiskBadge } from '@/components/RiskBadge'
import { Badge } from '@/components/ui/badge'
import { LoadingState, ErrorState, EmptyState } from '@/components/StateViews'
import { useI18n } from '@/hooks/use-i18n'

export default function Storage() {
  const { t } = useI18n()
  const [facilities, setFacilities] = useState<StorageFacility[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const loadData = () => {
    setLoading(true)
    setError(false)
    getStorageFacilities()
      .then(setFacilities)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="space-y-6 py-2">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">{t.storage.title}</h1>
        <p className="text-xs text-muted-foreground">{t.storage.subtitle}</p>
      </div>
      {loading ? (
        <LoadingState label="Loading storage facilities..." />
      ) : error ? (
        <ErrorState message="Unable to load storage facilities" onRetry={loadData} />
      ) : facilities.length === 0 ? (
        <EmptyState message="No storage facilities found" />
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {facilities.map((f) => (
            <div
              key={f.id}
              className="bg-card border border-border p-5 rounded-xl space-y-3 shadow-subtle"
            >
              <div className="flex items-start justify-between">
                <Warehouse className="w-6 h-6 text-primary" />
                <Badge variant="outline" className="text-[10px] uppercase">
                  {f.facility_type}
                </Badge>
              </div>
              <div>
                <h3 className="font-semibold text-sm">{f.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {f.distance_miles} {t.storage.distance} • {t.storage.fee}: ${f.fee_per_bushel}
                  {t.storage.perBushelDay}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{t.storage.capacity}</span>
                  <span
                    className={
                      f.capacity_pct > 85 ? 'font-bold text-amber-600' : 'font-bold text-primary'
                    }
                  >
                    {f.capacity_pct}%
                  </span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden border border-border">
                  <div
                    className={f.capacity_pct > 85 ? 'h-full bg-amber-500' : 'h-full bg-primary'}
                    style={{ width: `${f.capacity_pct}%` }}
                  />
                </div>
              </div>
              <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{t.storage.transportRisk}</span>
                <RiskBadge level={f.transport_risk === 'high' ? 'high' : 'low'} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
