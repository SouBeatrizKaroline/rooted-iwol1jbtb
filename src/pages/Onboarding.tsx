import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Wheat, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { useAuth } from '@/hooks/use-auth'
import { useI18n } from '@/hooks/use-i18n'
import pb from '@/lib/pocketbase/client'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function Onboarding() {
  const { t } = useI18n()
  const [step, setStep] = useState(1)
  const [role, setRole] = useState('')
  const [goal, setGoal] = useState('')
  const [saving, setSaving] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  const roles = [
    { id: 'producer', label: t.onboarding.roles.producer },
    { id: 'carrier', label: t.onboarding.roles.carrier },
    { id: 'cooperative', label: t.onboarding.roles.cooperative },
    { id: 'buyer', label: t.onboarding.roles.buyer },
    { id: 'logistics_manager', label: t.onboarding.roles.logistics_manager },
    { id: 'storage_operator', label: t.onboarding.roles.storage_operator },
    { id: 'other', label: t.onboarding.roles.other },
  ]
  const goals = [
    t.onboarding.goals.moveLoad,
    t.onboarding.goals.findRoute,
    t.onboarding.goals.reduceCosts,
    t.onboarding.goals.findStorage,
    t.onboarding.goals.findBackhaul,
    t.onboarding.goals.monitorShipments,
    t.onboarding.goals.analyzeLogistics,
  ]

  const handleComplete = async () => {
    setSaving(true)
    try {
      await pb.collection('users').update(user.id, { role, onboarded: true })
      toast.success(t.notifications.profileSetup)
      navigate('/planner')
    } catch {
      toast.error(t.errors.genericError)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-8">
      <Card className="w-full max-w-lg shadow-elevation">
        <CardHeader className="text-center space-y-2">
          <Wheat className="w-8 h-8 text-primary mx-auto" />
          <CardTitle className="text-2xl font-bold">{t.onboarding.welcome}</CardTitle>
          <CardDescription className="text-xs">
            {t.onboarding.stepOf} {step} {t.common.of} 2 — {t.onboarding.setupProfile}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 ? (
            <div className="space-y-4">
              <p className="text-sm font-semibold">{t.onboarding.whoAreYou}</p>
              <div className="grid gap-2">
                {roles.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRole(r.id)}
                    className={cn(
                      'p-3 rounded-lg border text-left text-sm transition-all',
                      role === r.id
                        ? 'bg-primary/5 border-primary text-primary'
                        : 'bg-secondary border-border text-foreground hover:border-primary/30',
                    )}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
              <Button onClick={() => setStep(2)} disabled={!role} className="w-full">
                {t.common.continue}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm font-semibold">{t.onboarding.whatAccomplish}</p>
              <div className="grid gap-2">
                {goals.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGoal(g)}
                    className={cn(
                      'p-3 rounded-lg border text-left text-sm transition-all',
                      goal === g
                        ? 'bg-primary/5 border-primary text-primary'
                        : 'bg-secondary border-border text-foreground hover:border-primary/30',
                    )}
                  >
                    {g}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)}>
                  {t.common.back}
                </Button>
                <Button
                  onClick={handleComplete}
                  disabled={!goal || saving}
                  className="flex-1 font-semibold gap-2"
                >
                  <span>{saving ? t.onboarding.saving : t.onboarding.startPlanning}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
