import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Wheat, Truck, ArrowRight, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { optimizeRoute } from '@/services/routes'
import { VehicleForm } from '@/components/VehicleForm'
import { toast } from 'sonner'

export default function RoutePlanner() {
  const [step, setStep] = useState(1)
  const [commodity, setCommodity] = useState('Corn')
  const [weight, setWeight] = useState(48000)
  const [estimatedValue, setEstimatedValue] = useState(22500)
  const [origin, setOrigin] = useState('Ames, IA Farm 4')
  const [destination, setDestination] = useState('Des Moines Grain Terminal')
  const [loading, setLoading] = useState(false)
  const [vehicleModal, setVehicleModal] = useState(false)
  const navigate = useNavigate()

  const commodities = [
    { name: 'Corn', icon: '🌽' },
    { name: 'Soybeans', icon: '🌱' },
    { name: 'Wheat', icon: '🌾' },
    { name: 'Rice', icon: '🍚' },
    { name: 'Cotton', icon: '🤍' },
    { name: 'Potatoes', icon: '🥔' },
    { name: 'Produce', icon: '🍅' },
    { name: 'Other', icon: '📦' },
  ]

  const handleFindRoute = async () => {
    setLoading(true)
    try {
      const result = await optimizeRoute({
        commodity,
        load_weight_lb: weight,
        estimated_value_usd: estimatedValue,
        origin_name: origin,
        destination_name: destination,
      })
      toast.success('Load-aware routes calculated')
      navigate('/results', { state: { result } })
    } catch (err: any) {
      toast.error('Calculation failed: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-4">
      {/* Step Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">Plan an Agricultural Route</h1>
        <p className="text-xs text-zinc-400">Step {step} of 5 — Tell us what you need to move</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-emerald-500 h-full transition-all duration-300"
          style={{ width: `${(step / 5) * 100}%` }}
        />
      </div>

      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-zinc-100">Step 1: WHAT ARE YOU MOVING?</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {commodities.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setCommodity(c.name)}
                  className={`p-4 rounded-xl border flex flex-col items-center gap-2 text-sm font-semibold transition-all ${
                    commodity === c.name
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-950'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <span className="text-3xl">{c.icon}</span>
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
            <Button
              onClick={() => setStep(2)}
              className="w-full bg-emerald-600 hover:bg-emerald-500"
            >
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-zinc-100">Step 2: HOW MUCH CARGO WEIGHT?</h2>
            <div className="space-y-2">
              <Label className="text-xs text-zinc-400">Cargo Weight (lbs)</Label>
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="bg-zinc-950 border-zinc-800 text-zinc-100 text-lg h-12"
              />
              <div className="space-y-2 pt-2">
                <Label className="text-xs text-zinc-400">Estimated Value (USD)</Label>
                <Input
                  type="number"
                  value={estimatedValue}
                  onChange={(e) => setEstimatedValue(Number(e.target.value))}
                  className="bg-zinc-950 border-zinc-800 text-zinc-100"
                />
              </div>
              <div className="flex gap-2 pt-1">
                {[40000, 48000, 52000].map((w) => (
                  <Button
                    key={w}
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-xs border-zinc-800 bg-zinc-950 text-zinc-300"
                    onClick={() => setWeight(w)}
                  >
                    {w.toLocaleString()} lbs
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)} className="border-zinc-800">
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-zinc-100">Step 3: ORIGIN & DESTINATION</h2>
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-zinc-400">Pickup Location (Origin)</Label>
                <Input
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="bg-zinc-950 border-zinc-800 text-zinc-100"
                />
              </div>
              <div>
                <Label className="text-xs text-zinc-400">Delivery Destination</Label>
                <Input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="bg-zinc-950 border-zinc-800 text-zinc-100"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(2)} className="border-zinc-800">
                Back
              </Button>
              <Button
                onClick={() => setStep(4)}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-zinc-100">Step 4: SCHEDULE & TIMING</h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-zinc-400">Pickup Window</Label>
                <Input
                  type="date"
                  defaultValue="2026-08-10"
                  className="bg-zinc-950 border-zinc-800 text-zinc-100"
                />
              </div>
              <div>
                <Label className="text-xs text-zinc-400">Delivery Deadline</Label>
                <Input
                  type="date"
                  defaultValue="2026-08-11"
                  className="bg-zinc-950 border-zinc-800 text-zinc-100"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(3)} className="border-zinc-800">
                Back
              </Button>
              <Button
                onClick={() => setStep(5)}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-zinc-100">Step 5: VEHICLE SELECTION</h2>
            <div className="p-4 bg-zinc-950 border border-emerald-800/40 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-zinc-200">
                  5-Axle Standard Grain Hopper (3S2)
                </span>
                <span className="text-xs text-emerald-400 font-medium">Default</span>
              </div>
              <p className="text-xs text-zinc-400">
                Gross Weight Rating: 80,000 lbs | Height: 13.5 ft
              </p>
              <Button
                variant="link"
                onClick={() => setVehicleModal(true)}
                className="text-xs text-emerald-400 p-0 h-auto"
              >
                + Add Custom Truck Profile
              </Button>
            </div>

            <div className="flex gap-2 pt-2">
              <Button variant="outline" onClick={() => setStep(4)} className="border-zinc-800">
                Back
              </Button>
              <Button
                onClick={handleFindRoute}
                disabled={loading}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 font-semibold gap-2 text-white h-11"
              >
                <span>{loading ? 'Evaluating Infrastructure...' : 'Find Best Route'}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <VehicleForm open={vehicleModal} onOpenChange={setVehicleModal} />
    </div>
  )
}
