import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { InteractiveMap } from '@/components/InteractiveMap'
import { RiskBadge } from '@/components/RiskBadge'
import { WhatIfSimulation } from '@/components/WhatIfSimulation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react'
import { createShipment } from '@/services/shipments'
import { useI18n } from '@/hooks/use-i18n'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function RouteResults() {
  const { t } = useI18n()
  const location = useLocation()
  const navigate = useNavigate()
  const [selectedRoute, setSelectedRoute] = useState(0)
  const [simulationOpen, setSimulationOpen] = useState(false)

  const routes = location.state?.result?.routes || [
    {
      mode: 'recommended',
      name: 'Route B (US-69 Bypass Corridor)',
      distance_miles: 48.7,
      estimated_cost_usd: 501,
      estimated_time_minutes: 52,
      risk_level: 'low',
      compatibility_status: [
        { label: 'Weight Compatible', pass: true, detail: '' },
        { label: 'Bridge Rating Pass', pass: true, detail: '' },
      ],
      recommendation_reason:
        'Route B avoids the IA-210 bridge weight restriction posted at 34 tons. Although 4.2 miles longer, it eliminates non-compliance risk.',
    },
    {
      mode: 'cheapest',
      name: 'Route A (Direct via IA-210)',
      distance_miles: 44.5,
      estimated_cost_usd: 483,
      estimated_time_minutes: 48,
      risk_level: 'high',
      compatibility_status: [{ label: 'Bridge Rating Warning', pass: false, detail: '' }],
      recommendation_reason: 'Shortest mileage but contains posted weight limit violation.',
    },
  ]

  const handleSaveShipment = async () => {
    try {
      await createShipment({
        commodity_name: 'Corn',
        load_weight_lb: 48000,
        origin_name: 'Ames, IA Farm 4',
        destination_name: 'Des Moines Grain Elevator',
        status: 'active',
      })
      toast.success(t.routes.shipmentSaved)
      navigate('/dashboard')
    } catch {
      toast.error(t.routes.saveFailed)
    }
  }

  const current = routes[selectedRoute] || routes[0]

  return (
    <div className="space-y-6 py-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t.routes.resultsTitle}</h1>
          <p className="text-xs text-muted-foreground">{t.routes.resultsSubtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSimulationOpen(true)}
            className="text-xs gap-1.5"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.routes.simulation}</span>
          </Button>
          <Button size="sm" onClick={handleSaveShipment} className="text-xs">
            {t.routes.saveShipment}
          </Button>
        </div>
      </div>

      <InteractiveMap selectedRouteIndex={selectedRoute} onSelectRoute={setSelectedRoute} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {routes.map((r: any, idx: number) => (
          <div
            key={idx}
            onClick={() => setSelectedRoute(idx)}
            className={cn(
              'p-4 rounded-xl border cursor-pointer transition-all',
              selectedRoute === idx
                ? 'bg-card border-primary shadow-elevation ring-1 ring-primary/30'
                : 'bg-card border-border hover:border-primary/30',
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <Badge
                variant="outline"
                className="uppercase text-[10px] border-primary/30 text-primary"
              >
                {r.mode}
              </Badge>
              <RiskBadge level={r.risk_level} />
            </div>
            <h3 className="font-semibold text-sm mb-1">{r.name}</h3>
            <div className="flex items-baseline gap-3 text-lg font-bold mb-2">
              <span>${r.estimated_cost_usd}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {r.distance_miles} mi • {r.estimated_time_minutes} min
              </span>
            </div>
            <div className="space-y-1 text-[11px] pt-2 border-t border-border">
              {r.compatibility_status?.map((c: any, i: number) => (
                <div key={i} className="flex items-center gap-1.5">
                  {c.pass ? (
                    <CheckCircle2 className="w-3 h-3 text-primary" />
                  ) : (
                    <XCircle className="w-3 h-3 text-destructive" />
                  )}
                  <span className="text-muted-foreground">{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-primary/5 border border-primary/15 rounded-xl p-5 space-y-2">
        <h3 className="font-semibold text-primary text-sm">
          {t.routes.whyRecommends} {current.name}
        </h3>
        <p className="text-xs text-foreground/80 leading-relaxed">
          {current.recommendation_reason}
        </p>
      </div>

      <WhatIfSimulation open={simulationOpen} onOpenChange={setSimulationOpen} />
    </div>
  )
}
