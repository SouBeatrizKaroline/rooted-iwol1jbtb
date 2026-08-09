import { Link, useNavigate } from 'react-router-dom'
import {
  Truck,
  ShieldAlert,
  Warehouse,
  ArrowRight,
  ArrowLeftRight,
  Bot,
  Package,
  Route as RouteIcon,
  Accessibility as AccessibilityIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ComplianceDisclaimer } from '@/components/ComplianceDisclaimer'
import { useI18n } from '@/hooks/use-i18n'
import { useAuth } from '@/hooks/use-auth'
import { toast } from 'sonner'

export default function Index() {
  const { t } = useI18n()
  const { demoSignIn } = useAuth()
  const navigate = useNavigate()

  const handleDemo = async () => {
    const { error } = await demoSignIn()
    if (error) toast.error('Demo mode unavailable. Please try again.')
    else {
      toast.success('Demo mode activated — using simulated data')
      navigate('/dashboard')
    }
  }

  return (
    <div className="space-y-12 py-6">
      <section className="relative rounded-2xl bg-gradient-to-br from-primary/5 via-secondary to-background border border-border p-6 md:p-12 overflow-hidden">
        <div className="max-w-3xl space-y-6 relative z-10">
          <Badge
            variant="outline"
            className="border-primary/30 bg-primary/5 text-primary px-3 py-1 text-xs"
          >
            {t.tagline}
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            {t.landing.headline}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {t.landing.subheadline}
          </p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:gap-4">
            <Link to="/signup">
              <Button size="lg" className="font-semibold gap-2 w-full sm:w-auto">
                {t.landing.startNow}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" onClick={handleDemo} className="w-full sm:w-auto">
              Try Demo
            </Button>
            <Link to="/demo">
              <Button size="lg" variant="ghost" className="w-full sm:w-auto">
                {t.landing.exploreDemo}
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute right-0 top-0 hidden lg:flex items-center gap-2 p-8 opacity-30 pointer-events-none">
          <div className="flex flex-col items-center gap-1">
            <Truck className="w-8 h-8 text-primary" />
            <span className="text-[10px] text-muted-foreground">{t.landing.truck}</span>
          </div>
          <div className="w-8 h-px bg-border" />
          <div className="flex flex-col items-center gap-1">
            <RouteIcon className="w-8 h-8 text-blue-500" />
            <span className="text-[10px] text-muted-foreground">{t.landing.road}</span>
          </div>
          <div className="w-8 h-px bg-border" />
          <div className="flex flex-col items-center gap-1">
            <ShieldAlert className="w-8 h-8 text-amber-600" />
            <span className="text-[10px] text-muted-foreground">{t.landing.bridge}</span>
          </div>
          <div className="w-8 h-px bg-border" />
          <div className="flex flex-col items-center gap-1">
            <Warehouse className="w-8 h-8 text-primary" />
            <span className="text-[10px] text-muted-foreground">{t.landing.storageNode}</span>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold">{t.landing.problemTitle}</h2>
          <p className="text-sm text-muted-foreground">{t.landing.problemDesc}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              icon: ShieldAlert,
              title: t.landing.infraIntelTitle,
              desc: t.landing.infraIntelDesc,
              color: 'text-amber-600',
            },
            {
              icon: Warehouse,
              title: t.landing.storageIntelTitle,
              desc: t.landing.storageIntelDesc,
              color: 'text-primary',
            },
            {
              icon: ArrowLeftRight,
              title: t.landing.carrierMatchTitle,
              desc: t.landing.carrierMatchDesc,
              color: 'text-blue-500',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-card border border-border p-5 rounded-xl space-y-2 shadow-subtle"
            >
              <item.icon className={`w-6 h-6 ${item.color}`} />
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/50 border border-border p-6 md:p-8 rounded-2xl space-y-6">
        <h2 className="text-xl font-bold text-center">{t.landing.worksTitle}</h2>
        <p className="text-sm text-muted-foreground text-center">{t.landing.worksSubtitle}</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center text-xs">
          {[
            { n: 1, t: t.landing.step1, d: t.landing.step1Desc },
            { n: 2, t: t.landing.step2, d: t.landing.step2Desc },
            { n: 3, t: t.landing.step3, d: t.landing.step3Desc },
            { n: 4, t: t.landing.step4, d: t.landing.step4Desc },
            { n: 5, t: t.landing.step5, d: t.landing.step5Desc },
          ].map((s) => (
            <div key={s.n} className="p-3 bg-card border border-border rounded-lg">
              <span className="text-primary font-bold block mb-1">
                {s.n}. {s.t}
              </span>
              <span className="text-muted-foreground">{s.d}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        {[
          { icon: Package, title: t.landing.loadIntelTitle, desc: t.landing.loadIntelDesc },
          { icon: RouteIcon, title: t.landing.routeIntelTitle, desc: t.landing.routeIntelDesc },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-card border border-border p-5 rounded-xl space-y-2 shadow-subtle"
          >
            <item.icon className="w-6 h-6 text-primary" />
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </section>

      <section className="bg-primary/5 border border-primary/15 p-6 md:p-8 rounded-2xl space-y-4">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold">{t.landing.rootTitle}</h2>
        </div>
        <p className="text-sm text-foreground/80">{t.landing.rootDesc}</p>
        <Link to="/copilot">
          <Button variant="outline">
            {t.copilot.askRoot}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </section>

      <section className="bg-secondary/50 border border-border p-6 rounded-2xl space-y-2">
        <div className="flex items-center gap-2">
          <AccessibilityIcon className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">{t.landing.accessibilityTitle}</h3>
        </div>
        <p className="text-xs text-muted-foreground">{t.landing.accessibilityDesc}</p>
      </section>

      <section className="space-y-4 text-center">
        <h2 className="text-2xl font-bold">{t.landing.ctaTitle}</h2>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">{t.landing.ctaDesc}</p>
        <Link to="/signup">
          <Button size="lg" className="font-semibold gap-2">
            {t.landing.startNow}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </section>

      <ComplianceDisclaimer />
    </div>
  )
}
