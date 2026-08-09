import { Link } from 'react-router-dom'
import {
  Truck,
  ShieldAlert,
  Warehouse,
  ArrowRight,
  ArrowLeftRight,
  Bot,
  Package,
  Route as RouteIcon,
  Building2,
  Sprout,
  Accessibility as AccessibilityIcon,
  TrendingUp,
  Eye,
  Wrench,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ComplianceDisclaimer } from '@/components/ComplianceDisclaimer'
import { useI18n } from '@/hooks/use-i18n'

export default function Index() {
  const { t } = useI18n()

  return (
    <div className="space-y-16 py-4">
      <section className="relative rounded-2xl bg-gradient-to-b from-emerald-950/40 to-zinc-950 border border-emerald-900/30 p-6 md:p-12 overflow-hidden">
        <div className="max-w-3xl space-y-6 relative z-10">
          <Badge
            variant="outline"
            className="border-emerald-700/60 bg-emerald-950/60 text-emerald-300 px-3 py-1 text-xs"
          >
            {t.tagline}
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            {t.landing.headline}
          </h1>
          <p className="text-base md:text-lg text-zinc-300 leading-relaxed">
            {t.landing.subheadline}
          </p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:gap-4">
            <Link to="/signup">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold gap-2 shadow-lg shadow-emerald-600/20 w-full sm:w-auto"
              >
                {t.landing.startNow}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/demo">
              <Button
                size="lg"
                variant="outline"
                className="border-zinc-700 text-zinc-200 hover:bg-zinc-900 w-full sm:w-auto"
              >
                {t.landing.exploreDemo}
              </Button>
            </Link>
            <Link to="/demo">
              <Button
                size="lg"
                variant="ghost"
                className="text-zinc-400 hover:text-white w-full sm:w-auto"
              >
                {t.landing.howItWorks}
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute right-0 top-0 hidden lg:flex items-center gap-2 p-8 opacity-40 pointer-events-none">
          <div className="flex flex-col items-center gap-1">
            <Truck className="w-8 h-8 text-emerald-500" />
            <span className="text-[10px] text-zinc-500">{t.landing.truck}</span>
          </div>
          <div className="w-8 h-px bg-zinc-700" />
          <div className="flex flex-col items-center gap-1">
            <RouteIcon className="w-8 h-8 text-blue-500" />
            <span className="text-[10px] text-zinc-500">{t.landing.road}</span>
          </div>
          <div className="w-8 h-px bg-zinc-700" />
          <div className="flex flex-col items-center gap-1">
            <ShieldAlert className="w-8 h-8 text-amber-500" />
            <span className="text-[10px] text-zinc-500">{t.landing.bridge}</span>
          </div>
          <div className="w-8 h-px bg-zinc-700" />
          <div className="flex flex-col items-center gap-1">
            <Warehouse className="w-8 h-8 text-emerald-500" />
            <span className="text-[10px] text-zinc-500">{t.landing.storageNode}</span>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-white">{t.landing.problemTitle}</h2>
          <p className="text-sm text-zinc-400">{t.landing.problemDesc}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-xl space-y-2">
            <ShieldAlert className="w-6 h-6 text-amber-400" />
            <h3 className="font-semibold text-zinc-100">{t.landing.infraIntelTitle}</h3>
            <p className="text-xs text-zinc-400">{t.landing.infraIntelDesc}</p>
          </div>
          <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-xl space-y-2">
            <Warehouse className="w-6 h-6 text-emerald-400" />
            <h3 className="font-semibold text-zinc-100">{t.landing.storageIntelTitle}</h3>
            <p className="text-xs text-zinc-400">{t.landing.storageIntelDesc}</p>
          </div>
          <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-xl space-y-2">
            <ArrowLeftRight className="w-6 h-6 text-blue-400" />
            <h3 className="font-semibold text-zinc-100">{t.landing.carrierMatchTitle}</h3>
            <p className="text-xs text-zinc-400">{t.landing.carrierMatchDesc}</p>
          </div>
        </div>
      </section>

      <section className="bg-zinc-900/40 border border-zinc-800 p-6 md:p-8 rounded-2xl space-y-6">
        <h2 className="text-xl font-bold text-white text-center">{t.landing.worksTitle}</h2>
        <p className="text-sm text-zinc-400 text-center">{t.landing.worksSubtitle}</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center text-xs">
          <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
            <span className="text-emerald-400 font-bold block mb-1">1. {t.landing.step1}</span>
            <span className="text-zinc-400">{t.landing.step1Desc}</span>
          </div>
          <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
            <span className="text-emerald-400 font-bold block mb-1">2. {t.landing.step2}</span>
            <span className="text-zinc-400">{t.landing.step2Desc}</span>
          </div>
          <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
            <span className="text-emerald-400 font-bold block mb-1">3. {t.landing.step3}</span>
            <span className="text-zinc-400">{t.landing.step3Desc}</span>
          </div>
          <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
            <span className="text-emerald-400 font-bold block mb-1">4. {t.landing.step4}</span>
            <span className="text-zinc-400">{t.landing.step4Desc}</span>
          </div>
          <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg col-span-2 md:col-span-1">
            <span className="text-emerald-400 font-bold block mb-1">5. {t.landing.step5}</span>
            <span className="text-zinc-400">{t.landing.step5Desc}</span>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-xl space-y-2">
          <Package className="w-6 h-6 text-emerald-400" />
          <h3 className="font-semibold text-zinc-100">{t.landing.loadIntelTitle}</h3>
          <p className="text-xs text-zinc-400">{t.landing.loadIntelDesc}</p>
        </div>
        <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-xl space-y-2">
          <RouteIcon className="w-6 h-6 text-blue-400" />
          <h3 className="font-semibold text-zinc-100">{t.landing.routeIntelTitle}</h3>
          <p className="text-xs text-zinc-400">{t.landing.routeIntelDesc}</p>
        </div>
      </section>

      <section className="bg-gradient-to-b from-emerald-950/30 to-zinc-950 border border-emerald-800/30 p-6 md:p-8 rounded-2xl space-y-4">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6 text-emerald-400" />
          <h2 className="text-xl font-bold text-white">{t.landing.rootTitle}</h2>
        </div>
        <p className="text-sm text-zinc-300">{t.landing.rootDesc}</p>
        <Link to="/copilot">
          <Button
            variant="outline"
            className="border-emerald-700/60 text-emerald-300 hover:bg-emerald-950/40"
          >
            {t.copilot.askRoot}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </section>

      <section className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl space-y-2">
        <div className="flex items-center gap-2">
          <AccessibilityIcon className="w-5 h-5 text-emerald-400" />
          <h3 className="font-semibold text-zinc-100">{t.landing.accessibilityTitle}</h3>
        </div>
        <p className="text-xs text-zinc-400">{t.landing.accessibilityDesc}</p>
      </section>

      <section className="space-y-4 text-center">
        <h2 className="text-2xl font-bold text-white">{t.landing.ctaTitle}</h2>
        <p className="text-sm text-zinc-400 max-w-xl mx-auto">{t.landing.ctaDesc}</p>
        <Link to="/signup">
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold gap-2"
          >
            {t.landing.startNow}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </section>

      <ComplianceDisclaimer />
    </div>
  )
}
