import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Wheat, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export default function Onboarding() {
  const [step, setStep] = useState(1)
  const navigate = useNavigate()

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-8">
      <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800 text-zinc-100">
        <CardHeader className="text-center space-y-2">
          <Wheat className="w-8 h-8 text-emerald-400 mx-auto" />
          <CardTitle className="text-2xl font-bold">Welcome to Rooted</CardTitle>
          <CardDescription className="text-zinc-400 text-xs">
            Step {step} of 2 — Set up your agricultural logistics profile
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 ? (
            <div className="space-y-3">
              <p className="text-sm text-zinc-300">What is your primary freight objective?</p>
              <div className="grid gap-2">
                {[
                  'Move agricultural loads',
                  'Avoid bridge weight violations',
                  'Reduce empty deadhead miles',
                  'Find elevator storage',
                ].map((o, idx) => (
                  <button
                    key={idx}
                    onClick={() => setStep(2)}
                    className="p-3 bg-zinc-950 border border-zinc-800 hover:border-emerald-500 rounded-lg text-left text-sm text-zinc-200 transition-all"
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-zinc-300">Default Truck Profile Configured</p>
              <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg text-xs space-y-1 text-zinc-400">
                <p className="font-semibold text-zinc-200">5-Axle Standard Grain Hopper (3S2)</p>
                <p>Gross Weight Limit: 80,000 lbs</p>
                <p>Height: 13.5 ft | Length: 65 ft</p>
              </div>

              <Button
                onClick={() => navigate('/planner')}
                className="w-full bg-emerald-600 hover:bg-emerald-500 font-semibold gap-2"
              >
                <span>Start First Route Calculation</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
