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
        <h1 className="text-2xl font-bold text-white">{t.backhaul.title}</h1>
        <p className="text-xs text-zinc-400">{t.backhaul.subtitle}</p>
      </div>
      <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-xl p-4 flex items-center gap-3 text-xs text-emerald-200">
        <ArrowLeftRight className="w-6 h-6 text-emerald-400 shrink-0" />
        <div>
          <p className="font-semibold text-emerald-300">{t.backhaul.emptyMileReduction}</p>
          <p className="text-emerald-400/80">{t.backhaul.emptyMileDesc}</p>
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
              className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <span className="font-bold text-sm text-zinc-100">
                  {l.commodity} ({l.weight_lb?.toLocaleString()} lbs)
                </span>
                <p className="text-zinc-400">
                  {l.origin_name} → {l.destination_name}
                </p>
                <p className="text-[10px] text-amber-400">{t.backhaul.potentialOpportunity}</p>
              </div>
              <div className="text-right">
                <p className="text-base font-bold text-emerald-400">${l.rate_usd}</p>
                <p className="text-[10px] text-zinc-500">{l.pickup_window}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
