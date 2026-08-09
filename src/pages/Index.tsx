import { Link } from 'react-router-dom'
import {
  Truck,
  ShieldAlert,
  Warehouse,
  ArrowRight,
  ArrowLeftRight,
  Bot,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ComplianceDisclaimer } from '@/components/ComplianceDisclaimer'

export default function Index() {
  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="relative rounded-2xl bg-gradient-to-b from-emerald-950/40 to-zinc-950 border border-emerald-900/30 p-8 md:p-12 overflow-hidden">
        <div className="max-w-3xl space-y-6 relative z-10">
          <Badge
            variant="outline"
            className="border-emerald-700/60 bg-emerald-950/60 text-emerald-300 px-3 py-1 text-xs"
          >
            Agricultural Freight Intelligence Platform
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Smarter Routes for <span className="text-emerald-400">American Agriculture</span>
          </h1>

          <p className="text-lg text-zinc-300 leading-relaxed">
            Move agricultural freight with route intelligence built around the actual load, the
            truck, bridge restrictions, and seasonal rural road conditions.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link to="/planner">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold gap-2 shadow-lg shadow-emerald-600/20"
              >
                <span>Plan a Route</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="border-zinc-700 text-zinc-200 hover:bg-zinc-900"
              >
                Explore Platform
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Ag Freight is Different */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-white">Why Agricultural Freight is Different</h2>
          <p className="text-sm text-zinc-400">
            Generic GPS apps miss posted bridge weight limits, frost laws, and harvest elevator
            congestion.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-xl space-y-2">
            <ShieldAlert className="w-6 h-6 text-amber-400" />
            <h3 className="font-semibold text-zinc-100">Rural Bridge & Weight Restrictions</h3>
            <p className="text-xs text-zinc-400">
              80,000 lb grain semi-trailers require bridge formula compliance and seasonal thaw
              awareness.
            </p>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-xl space-y-2">
            <Warehouse className="w-6 h-6 text-emerald-400" />
            <h3 className="font-semibold text-zinc-100">Elevator Queue Intelligence</h3>
            <p className="text-xs text-zinc-400">
              Avoid 2-hour waiting queues at harvest peak by evaluating nearby processing capacity.
            </p>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-xl space-y-2">
            <ArrowLeftRight className="w-6 h-6 text-blue-400" />
            <h3 className="font-semibold text-zinc-100">Empty-Mile Backhaul Matching</h3>
            <p className="text-xs text-zinc-400">
              Reduce deadhead mileage by discovering return fertilizer and seed loads on return
              trips.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-2xl space-y-6">
        <h2 className="text-xl font-bold text-white text-center">5 Steps to Load-Aware Dispatch</h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center text-xs">
          <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
            <span className="text-emerald-400 font-bold block mb-1">1. Select Commodity</span>
            <span className="text-zinc-400">Corn, Soy, Wheat, Produce</span>
          </div>
          <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
            <span className="text-emerald-400 font-bold block mb-1">2. Load Weight</span>
            <span className="text-zinc-400">Gross & axle calculation</span>
          </div>
          <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
            <span className="text-emerald-400 font-bold block mb-1">3. Truck Axles</span>
            <span className="text-zinc-400">5-axle 3S2 hopper profile</span>
          </div>
          <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
            <span className="text-emerald-400 font-bold block mb-1">4. Infrastructure Check</span>
            <span className="text-zinc-400">Bridge rating verification</span>
          </div>
          <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg col-span-2 md:col-span-1">
            <span className="text-emerald-400 font-bold block mb-1">5. Dispatch Route</span>
            <span className="text-zinc-400">Recommended Route B</span>
          </div>
        </div>
      </section>

      <ComplianceDisclaimer />
    </div>
  )
}
