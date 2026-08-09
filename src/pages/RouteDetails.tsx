import { RestrictionCard } from '@/components/RestrictionCard'
import { ComplianceDisclaimer } from '@/components/ComplianceDisclaimer'

export default function RouteDetails() {
  return (
    <div className="space-y-6 py-2">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white">Route Infrastructure Details</h1>
        <p className="text-xs text-zinc-400">
          Detailed bridge formula & segment intelligence for Route B
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-zinc-200">
            Infrastructure Restrictions En Route
          </h2>
          <RestrictionCard
            title="IA-210 Skunk River Bridge Weight Restriction"
            description="Posted at 34 tons maximum gross weight due to deck maintenance."
            severity="high"
            source="Iowa DOT — Demo"
            confidence="high"
            dataClass="verified"
          />
          <RestrictionCard
            title="US-30 Culvert Maintenance"
            description="Alternating lane closure with 12ft width restriction."
            severity="moderate"
            source="State Highway Patrol"
            confidence="high"
            dataClass="verified"
          />
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
          <h2 className="text-base font-semibold text-zinc-200">Estimated Cost Breakdown</h2>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-zinc-800 text-zinc-300">
              <span>Fuel Expense (48.7 mi @ 5.8 mpg)</span>
              <span className="font-semibold">$142.00</span>
            </div>
            <div className="flex justify-between py-1 border-b border-zinc-800 text-zinc-300">
              <span>Driver Time & Wage</span>
              <span className="font-semibold">$185.00</span>
            </div>
            <div className="flex justify-between py-1 border-b border-zinc-800 text-zinc-300">
              <span>Equipment Depreciation</span>
              <span className="font-semibold">$124.00</span>
            </div>
            <div className="flex justify-between py-1 border-b border-zinc-800 text-zinc-300">
              <span>Risk & Toll Contingency</span>
              <span className="font-semibold">$50.00</span>
            </div>
            <div className="flex justify-between py-2 font-bold text-sm text-emerald-400">
              <span>Total Estimated Transportation Cost</span>
              <span>$501.00</span>
            </div>
          </div>
        </div>
      </div>

      <ComplianceDisclaimer />
    </div>
  )
}
