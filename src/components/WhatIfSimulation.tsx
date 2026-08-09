import { useState } from 'react'
import { HelpCircle, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { compareScenario } from '@/services/routes'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface WhatIfSimulationProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WhatIfSimulation({ open, onOpenChange }: WhatIfSimulationProps) {
  const [selectedScenario, setSelectedScenario] = useState('harvest_surge')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const scenarios = [
    { id: 'harvest_surge', label: 'Harvest Arrives 10 Days Early' },
    { id: 'rail_unavailable', label: 'Regional Rail Shuttle Unavailable' },
    { id: 'bridge_closure', label: 'County Bridge Emergency Weight Drop' },
  ]

  const handleSimulate = async () => {
    setLoading(true)
    try {
      const res = await compareScenario(selectedScenario)
      setResult(res)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-400" />
            <span>"What If?" Logistics Scenario Simulator</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-xs text-zinc-400">
            Simulate operational disruptions and agricultural market shifts to see how Rooted adapts
            recommended routes.
          </p>

          <div className="space-y-2">
            {scenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedScenario(s.id)
                  setResult(null)
                }}
                className={`w-full text-left p-3 rounded-lg border text-sm font-medium transition-all ${
                  selectedScenario === s.id
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <Button
            onClick={handleSimulate}
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white"
          >
            {loading ? 'Simulations Calculating...' : 'Run Simulation'}
          </Button>

          {result && (
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 space-y-2 text-xs">
              <div className="flex items-center justify-between text-emerald-400 font-semibold">
                <span>{result.scenario}</span>
                <span className="text-[10px] bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded">
                  Calculated Impact
                </span>
              </div>
              <p className="text-zinc-300">{result.summary}</p>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800 text-zinc-400">
                <div>
                  Cost Change:{' '}
                  <span className="text-amber-400 font-semibold">+{result.cost_delta_pct}%</span>
                </div>
                <div>
                  Delay Added:{' '}
                  <span className="text-amber-400 font-semibold">
                    +{result.time_delta_mins} mins
                  </span>
                </div>
              </div>

              <div className="p-2 bg-emerald-950/30 border border-emerald-800/40 rounded text-emerald-200">
                <strong>Recommended Action:</strong> {result.actionable_advice}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
