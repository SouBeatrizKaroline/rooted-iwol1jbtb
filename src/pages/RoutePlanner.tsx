import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { optimizeRoute } from '@/services/routes'
import { VehicleForm } from '@/components/VehicleForm'
import { useI18n } from '@/hooks/use-i18n'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function RoutePlanner() {
  const { t } = useI18n()
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
      toast.success(t.notifications.routeCalculated)
      navigate('/results', { state: { result } })
    } catch (err: any) {
      toast.error(t.routes.calcFailed + ': ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-4">
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold">{t.routes.planTitle}</h1>
        <p className="text-xs text-muted-foreground">
          {t.routes.step} {step} {t.routes.of} 5
        </p>
      </div>
      <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-primary h-full transition-all duration-300"
          style={{ width: `${(step / 5) * 100}%` }}
        />
      </div>
      <div className="bg-card border border-border rounded-2xl p-6 space-y-6 shadow-subtle">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-base md:text-lg font-semibold">{t.routes.step1Title}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {commodities.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setCommodity(c.name)}
                  className={cn(
                    'p-4 rounded-xl border flex flex-col items-center gap-2 text-sm font-semibold transition-all',
                    commodity === c.name
                      ? 'bg-primary/5 border-primary text-primary'
                      : 'bg-secondary border-border text-muted-foreground hover:border-primary/30',
                  )}
                >
                  <span className="text-3xl">{c.icon}</span>
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
            <Button onClick={() => setStep(2)} className="w-full">
              {t.common.continue}
            </Button>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-base md:text-lg font-semibold">{t.routes.step2Title}</h2>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">{t.routes.cargoWeight}</Label>
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="text-lg h-12"
              />
              <div className="space-y-2 pt-2">
                <Label className="text-xs text-muted-foreground">{t.routes.estimatedValue}</Label>
                <Input
                  type="number"
                  value={estimatedValue}
                  onChange={(e) => setEstimatedValue(Number(e.target.value))}
                />
              </div>
              <div className="flex gap-2 pt-1">
                {[40000, 48000, 52000].map((w) => (
                  <Button
                    key={w}
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => setWeight(w)}
                  >
                    {w.toLocaleString()} lbs
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)}>
                {t.common.back}
              </Button>
              <Button onClick={() => setStep(3)} className="flex-1">
                {t.common.continue}
              </Button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-base md:text-lg font-semibold">{t.routes.step3Title}</h2>
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-muted-foreground">{t.routes.pickupLocation}</Label>
                <Input
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">
                  {t.routes.deliveryDestination}
                </Label>
                <Input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(2)}>
                {t.common.back}
              </Button>
              <Button onClick={() => setStep(4)} className="flex-1">
                {t.common.continue}
              </Button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-base md:text-lg font-semibold">{t.routes.step4Title}</h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground">{t.routes.pickupWindow}</Label>
                <Input type="date" defaultValue="2026-08-10" className="mt-1" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">{t.routes.deliveryDeadline}</Label>
                <Input type="date" defaultValue="2026-08-11" className="mt-1" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(3)}>
                {t.common.back}
              </Button>
              <Button onClick={() => setStep(5)} className="flex-1">
                {t.common.continue}
              </Button>
            </div>
          </div>
        )}
        {step === 5 && (
          <div className="space-y-4">
            <h2 className="text-base md:text-lg font-semibold">{t.routes.step5Title}</h2>
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold">5-Axle Standard Grain Hopper (3S2)</span>
                <span className="text-xs text-primary font-medium">{t.vehicles.default}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {t.vehicles.grossWeightRating}: 80,000 lbs | {t.vehicles.height}: 13.5 ft
              </p>
              <Button
                variant="link"
                onClick={() => setVehicleModal(true)}
                className="text-xs text-primary p-0 h-auto"
              >
                + {t.vehicles.addVehicle}
              </Button>
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" onClick={() => setStep(4)}>
                {t.common.back}
              </Button>
              <Button
                onClick={handleFindRoute}
                disabled={loading}
                className="flex-1 font-semibold gap-2 h-11"
              >
                <span>{loading ? t.routes.evaluating : t.routes.findBestRoute}</span>
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
