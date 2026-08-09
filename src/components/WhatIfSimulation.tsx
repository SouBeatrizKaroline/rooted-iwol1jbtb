import { useState } from 'react'
import { HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { compareScenario } from '@/services/routes'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

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
      setResult(await compareScenario(selectedScenario))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" />
            <span>"What If?" Logistics Scenario Simulator</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground">
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
                className={cn(
                  'w-full text-left p-3 rounded-lg border text-sm font-medium transition-all',
                  selectedScenario === s.id
                    ? 'bg-primary/5 border-primary text-primary'
                    : 'bg-secondary border-border text-foreground hover:border-primary/30',
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
          <Button onClick={handleSimulate} disabled={loading} className="w-full">
            {loading ? 'Simulations Calculating...' : 'Run Simulation'}
          </Button>
          {result && (
            <div className="bg-secondary border border-border rounded-lg p-3 space-y-2 text-xs">
              <div className="flex items-center justify-between text-primary font-semibold">
                <span>{result.scenario}</span>
                <span className="text-[10px] bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
                  Calculated Impact
                </span>
              </div>
              <p className="text-foreground">{result.summary}</p>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border text-muted-foreground">
                <div>
                  Cost Change:{' '}
                  <span className="text-amber-600 font-semibold">+{result.cost_delta_pct}%</span>
                </div>
                <div>
                  Delay Added:{' '}
                  <span className="text-amber-600 font-semibold">
                    +{result.time_delta_mins} mins
                  </span>
                </div>
              </div>
              <div className="p-2 bg-primary/5 border border-primary/20 rounded text-primary">
                <strong>Recommended Action:</strong> {result.actionable_advice}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
