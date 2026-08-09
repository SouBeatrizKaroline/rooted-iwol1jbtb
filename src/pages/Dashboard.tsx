import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Truck,
  ShieldAlert,
  BarChart2,
  DollarSign,
  ArrowUpRight,
  AlertTriangle,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { DashboardCharts } from '@/components/DashboardCharts'
import { Button } from '@/components/ui/button'
import { RiskBadge } from '@/components/RiskBadge'
import { getShipments, Shipment } from '@/services/shipments'
import { getAlerts, AlertItem } from '@/services/alerts'
import { useRealtime } from '@/hooks/use-realtime'

export default function Dashboard() {
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [alerts, setAlerts] = useState<AlertItem[]>([])

  const loadData = async () => {
    const [sResult, aResult] = await Promise.allSettled([getShipments(), getAlerts()])
    if (sResult.status === 'fulfilled') setShipments(sResult.value)
    if (aResult.status === 'fulfilled') setAlerts(aResult.value)
  }

  useEffect(() => {
    loadData()
  }, [])

  useRealtime('shipments', () => {
    loadData()
  })
  useRealtime('alerts', () => {
    loadData()
  })

  return (
    <div className="space-y-6 py-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Logistics Intelligence Dashboard</h1>
          <p className="text-xs text-zinc-400">
            Real-time overview of active agricultural loads & infrastructure risks
          </p>
        </div>
        <Link to="/planner">
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 font-semibold text-xs">
            + Plan New Route
          </Button>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-400 font-medium">Active Shipments</p>
              <p className="text-2xl font-bold text-white mt-1">{shipments.length || 1}</p>
            </div>
            <div className="bg-emerald-950 p-2.5 rounded-lg border border-emerald-800 text-emerald-400">
              <Truck className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-400 font-medium">Transportation Cost</p>
              <p className="text-2xl font-bold text-white mt-1">$4,850</p>
            </div>
            <div className="bg-emerald-950 p-2.5 rounded-lg border border-emerald-800 text-emerald-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-400 font-medium">Route Reliability</p>
              <p className="text-2xl font-bold text-emerald-400 mt-1">98.4%</p>
            </div>
            <div className="bg-emerald-950 p-2.5 rounded-lg border border-emerald-800 text-emerald-400">
              <BarChart2 className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-400 font-medium">Active Alerts</p>
              <p className="text-2xl font-bold text-amber-400 mt-1">{alerts.length || 1}</p>
            </div>
            <div className="bg-amber-950 p-2.5 rounded-lg border border-amber-800 text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      <DashboardCharts />

      {/* Active Shipments Table / Cards */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
        <h2 className="text-base font-semibold text-white">Active Freight Shipments</h2>
        <div className="space-y-3">
          {shipments.length > 0 ? (
            shipments.map((s) => (
              <div
                key={s.id}
                className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-zinc-100">
                      {s.commodity_name} ({s.load_weight_lb?.toLocaleString()} lbs)
                    </span>
                    <RiskBadge level="low" />
                  </div>
                  <p className="text-zinc-400">
                    {s.origin_name} → {s.destination_name}
                  </p>
                </div>
                <Link to="/details">
                  <Button size="sm" variant="outline" className="border-zinc-800 text-xs">
                    View Details
                  </Button>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-xs text-zinc-500">
              No active shipments. Click "Plan New Route" above.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
