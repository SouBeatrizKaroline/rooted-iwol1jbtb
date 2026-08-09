import { useEffect, useState } from 'react'
import { ArrowLeftRight } from 'lucide-react'
import { getBackhaulLoads, BackhaulLoad } from '@/services/backhaul'
import { LoadingState, ErrorState, EmptyState } from '@/components/StateViews'
import { useI18n } from '@/hooks/use-i18n'

export default function Backhaul() {
  const { t } = useI18n()
  const [loads, setLoads] = useState<BackhaulLoad[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const loadData = () => {
    setLoading(true)
    setError(false)
    getBackhaulLoads()
      .then(setLoads)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="space-y-6 py-2">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">{t.backhaul.title}</h1>
        <p className="text-xs text-muted-foreground">{t.backhaul.subtitle}</p>
      </div>
      <div className="bg-primary/5 border border-primary/15 rounded-xl p-4 flex items-center gap-3 text-xs">
        <ArrowLeftRight className="w-6 h-6 text-primary shrink-0" />
        <div>
          <p className="font-semibold text-primary">{t.backhaul.emptyMileReduction}</p>
          <p className="text-muted-foreground">{t.backhaul.emptyMileDesc}</p>
        </div>
      </div>
      {loading ? (
        <LoadingState label="Loading backhaul opportunities..." />
      ) : error ? (
        <ErrorState message="Unable to load backhaul loads" onRetry={loadData} />
      ) : loads.length === 0 ? (
        <EmptyState message="No backhaul loads available" />
      ) : (
        <div className="space-y-3">
          {loads.map((l) => (
            <div
              key={l.id}
              className="p-4 bg-card border border-border rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-subtle"
            >
              <div className="space-y-1">
                <span className="font-bold text-sm">
                  {l.commodity} ({l.weight_lb?.toLocaleString()} lbs)
                </span>
                <p className="text-muted-foreground">
                  {l.origin_name} → {l.destination_name}
                </p>
                <p className="text-[10px] text-amber-600">{t.backhaul.potentialOpportunity}</p>
              </div>
              <div className="text-right">
                <p className="text-base font-bold text-primary">${l.rate_usd}</p>
                <p className="text-[10px] text-muted-foreground">{l.pickup_window}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
