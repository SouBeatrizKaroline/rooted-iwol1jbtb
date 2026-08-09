import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Truck, ArrowRight, Beaker, Sparkles, CheckCircle2, XCircle } from 'lucide-react'
import { DemoBanner } from '@/components/DemoBanner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RiskBadge } from '@/components/RiskBadge'
import { cn } from '@/lib/utils'

const demoRoutes = [
  {
    mode: 'recommended',
    name: 'Route B (US-69 Bypass Corridor)',
    distance_miles: 49.3,
    estimated_cost_usd: 501,
    estimated_time_minutes: 72,
    risk_level: 'low' as const,
    compatibility: [
      { label: 'Weight Compatible', pass: true },
      { label: 'No Known Critical Restrictions', pass: true },
      { label: 'Delivery Window Satisfied', pass: true },
    ],
    reason:
      'Route B is recommended because it avoids a weight-restricted bridge and has lower disruption risk.',
  },
  {
    mode: 'cheapest',
    name: 'Route A (Direct via IA-210)',
    distance_miles: 44.5,
    estimated_cost_usd: 483,
    estimated_time_minutes: 89,
    risk_level: 'moderate' as const,
    compatibility: [{ label: 'Bridge Rating Warning', pass: false }],
    reason: 'Shortest and cheapest, but includes a posted bridge weight limit violation risk.',
  },
  {
    mode: 'fastest',
    name: 'Route C (I-35 Express)',
    distance_miles: 55.5,
    estimated_cost_usd: 527,
    estimated_time_minutes: 58,
    risk_level: 'moderate' as const,
    compatibility: [{ label: 'Higher Weather Risk', pass: false }],
    reason: 'Fastest travel time but higher fuel cost and elevated weather risk.',
  },
]

const simulations = [
  {
    id: 'bridge',
    label: 'Bridge restriction closes Route A',
    result: 'Route A unavailable. Route B recalculated as primary — Low risk, $501.',
  },
  {
    id: 'weather',
    label: 'Severe weather on I-35 corridor',
    result: 'Route C risk upgraded to High. Route B remains Recommended.',
  },
  {
    id: 'weight',
    label: 'Cargo weight changes to 60,000 lb',
    result: 'Route A now non-compliant. Route B confirmed compatible at 91,000 lb gross.',
  },
  {
    id: 'closure',
    label: 'Road closure on US-69 segment',
    result: 'Detour added to Route B: +3.2 mi, +$15. Still lowest risk.',
  },
  {
    id: 'storage',
    label: 'Storage destination unavailable',
    result: 'Alternate elevator suggested: Story City Terminal, 91% available.',
  },
]

export default function Demo() {
  const [showResults, setShowResults] = useState(false)
  const [simResult, setSimResult] = useState<string | null>(null)
  const [selectedSim, setSelectedSim] = useState('')

  return (
    <div className="space-y-6 py-4">
      <DemoBanner />
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Explore Rooted Demo</h1>
        <p className="text-sm text-muted-foreground">
          See how Rooted works with sample agricultural freight data
        </p>
      </div>
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-subtle">
        <div className="flex items-center gap-2">
          <Truck className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Preconfigured Scenario</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          {[
            ['Origin', 'Ames, Iowa'],
            ['Destination', 'Grain Elevator'],
            ['Commodity', 'Corn'],
            ['Load Weight', '48,000 lb'],
            ['Vehicle', '5-Axle Tractor-Trailer'],
            ['Delivery', 'Tomorrow'],
          ].map(([label, val]) => (
            <div key={label} className="p-3 bg-secondary border border-border rounded-lg">
              <p className="text-muted-foreground">{label}</p>
              <p className="font-semibold">{val}</p>
            </div>
          ))}
        </div>
        <Button onClick={() => setShowResults(true)} className="w-full font-semibold gap-2">
          <span>Find Best Route</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
      {showResults && (
        <>
          <div className="grid sm:grid-cols-3 gap-4">
            {demoRoutes.map((r, idx) => (
              <div
                key={idx}
                className={cn(
                  'p-4 rounded-xl border',
                  r.mode === 'recommended'
                    ? 'bg-card border-primary ring-1 ring-primary/30'
                    : 'bg-card border-border',
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
                <div className="flex items-baseline gap-2 text-lg font-bold mb-2">
                  <span>${r.estimated_cost_usd}</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {r.distance_miles} mi • {r.estimated_time_minutes}m
                  </span>
                </div>
                <div className="space-y-1 text-[11px] pt-2 border-t border-border">
                  {r.compatibility.map((c, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-muted-foreground">
                      {c.pass ? (
                        <CheckCircle2 className="w-3 h-3 text-primary" />
                      ) : (
                        <XCircle className="w-3 h-3 text-destructive" />
                      )}
                      <span>{c.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-primary/5 border border-primary/15 rounded-xl p-5 space-y-2">
            <h3 className="font-semibold text-primary text-sm">Why Rooted Recommends Route B</h3>
            <p className="text-xs text-foreground/80 leading-relaxed">{demoRoutes[0].reason}</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-subtle">
            <div className="flex items-center gap-2">
              <Beaker className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-semibold">"What If?" Simulations</h2>
            </div>
            <div className="space-y-2">
              {simulations.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedSim(s.id)
                    setSimResult(s.result)
                  }}
                  className={cn(
                    'w-full text-left p-3 rounded-lg border text-sm transition-all',
                    selectedSim === s.id
                      ? 'bg-amber-50 border-amber-300 text-amber-800'
                      : 'bg-secondary border-border text-foreground hover:border-amber-300',
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
            {simResult && (
              <div className="bg-secondary border border-amber-200 rounded-lg p-3 text-xs">
                <Badge
                  variant="outline"
                  className="text-[10px] border-amber-300 text-amber-700 mb-2"
                >
                  Simulated scenario
                </Badge>
                <p className="text-foreground">{simResult}</p>
              </div>
            )}
          </div>
        </>
      )}
      <div className="text-center pt-4">
        <p className="text-sm text-muted-foreground mb-3">
          Ready to use Rooted with your own data?
        </p>
        <Link to="/signup">
          <Button className="font-semibold gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Start Planning</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
