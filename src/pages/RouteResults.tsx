import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { InteractiveMap } from '@/components/InteractiveMap'
import { RiskBadge } from '@/components/RiskBadge'
import { WhatIfSimulation } from '@/components/WhatIfSimulation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, HelpCircle, ArrowRight } from 'lucide-react'
import { createShipment } from '@/services/shipments'
import { toast } from 'sonner'

export default function RouteResults() {
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
        { label: 'Weight Compatible', pass: true, detail: 'Gross weight within 80,000 lbs limit' },
        {
          label: 'Bridge Rating Pass',
          pass: true,
          detail: 'Crosses via reinforced highway bridge',
        },
      ],
      recommendation_reason:
        'Route B avoids the IA-210 bridge weight restriction posted at 34 tons. Although 4.2 miles longer, it eliminates non-compliance risk.',
    },
    {
      mode: 'cheapest',
      name: 'Route A (Direct via IA-210 local bridge)',
      distance_miles: 44.5,
      estimated_cost_usd: 483,
      estimated_time_minutes: 48,
      risk_level: 'high',
      compatibility_status: [
        {
          label: 'Bridge Rating Warning',
          pass: false,
          detail: 'Exceeds IA-210 posted weight limit',
        },
      ],
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
      toast.success('Shipment saved to active dashboard!')
      navigate('/dashboard')
    } catch (err: any) {
      toast.error('Failed to save shipment')
    }
  }

  const current = routes[selectedRoute] || routes[0]

  return (
    <div className="space-y-6 py-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Route Optimization Results</h1>
          <p className="text-xs text-zinc-400">
            Load-aware infrastructure calculation results (Demo Data)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSimulationOpen(true)}
            className="border-zinc-800 text-xs gap-1.5"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>"What If?" Simulation</span>
          </Button>
          <Button
            size="sm"
            onClick={handleSaveShipment}
            className="bg-emerald-600 hover:bg-emerald-500 text-xs"
          >
            Save Shipment
          </Button>
        </div>
      </div>

      <InteractiveMap selectedRouteIndex={selectedRoute} onSelectRoute={setSelectedRoute} />

      {/* Route Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {routes.map((r: any, idx: number) => (
          <div
            key={idx}
            onClick={() => setSelectedRoute(idx)}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              selectedRoute === idx
                ? 'bg-zinc-900 border-emerald-500 shadow-lg ring-1 ring-emerald-500/50'
                : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <Badge
                variant="outline"
                className="uppercase text-[10px] border-emerald-800 text-emerald-400"
              >
                {r.mode}
              </Badge>
              <RiskBadge level={r.risk_level} />
            </div>

            <h3 className="font-semibold text-zinc-100 text-sm mb-1">{r.name}</h3>

            <div className="flex items-baseline gap-3 text-lg font-bold text-white mb-2">
              <span>${r.estimated_cost_usd}</span>
              <span className="text-xs font-normal text-zinc-400">
                {r.distance_miles} mi • {r.estimated_time_minutes} min
              </span>
            </div>

            <div className="space-y-1 text-[11px] pt-2 border-t border-zinc-800">
              {r.compatibility_status?.map((c: any, i: number) => (
                <div key={i} className="flex items-center gap-1.5 text-zinc-300">
                  {c.pass ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <XCircle className="w-3 h-3 text-rose-400" />
                  )}
                  <span>{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Why This Route Explanation */}
      <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-xl p-5 space-y-2">
        <h3 className="font-semibold text-emerald-300 text-sm">
          Why Rooted Recommends {current.name}
        </h3>
        <p className="text-xs text-zinc-300 leading-relaxed">{current.recommendation_reason}</p>
      </div>

      <WhatIfSimulation open={simulationOpen} onOpenChange={setSimulationOpen} />
    </div>
  )
}
