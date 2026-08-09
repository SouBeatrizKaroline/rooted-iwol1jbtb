import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Truck, BarChart2, DollarSign, AlertTriangle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { DashboardCharts } from '@/components/DashboardCharts'
import { Button } from '@/components/ui/button'
import { RiskBadge } from '@/components/RiskBadge'
import { LoadingState } from '@/components/StateViews'
import { getShipments, Shipment } from '@/services/shipments'
import { getAlerts, AlertItem } from '@/services/alerts'
import { useRealtime } from '@/hooks/use-realtime'
import { useI18n } from '@/hooks/use-i18n'

export default function Dashboard() {
  const { t } = useI18n()
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [alerts, setAlerts] = useState<AlertItem[]>([])
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    setLoading(true)
    const [sResult, aResult] = await Promise.allSettled([getShipments(), getAlerts()])
    if (sResult.status === 'fulfilled') setShipments(sResult.value)
    if (aResult.status === 'fulfilled') setAlerts(aResult.value)
    setLoading(false)
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

  const hour = new Date().getHours()
  const greeting =
    hour < 12
      ? t.dashboard.greetingMorning
      : hour < 18
        ? t.dashboard.greetingAfternoon
        : t.dashboard.greetingEvening

  if (loading) return <LoadingState label="Loading dashboard..." />

  const kpis = [
    {
      label: t.dashboard.activeShipments,
      value: shipments.length || 1,
      icon: Truck,
      color: 'text-primary',
      bg: 'bg-primary/10 border-primary/20',
    },
    {
      label: t.dashboard.transportCost,
      value: '$4,850',
      icon: DollarSign,
      color: 'text-primary',
      bg: 'bg-primary/10 border-primary/20',
    },
    {
      label: t.dashboard.routeReliability,
      value: '98.4%',
      icon: BarChart2,
      color: 'text-primary',
      bg: 'bg-primary/10 border-primary/20',
    },
    {
      label: t.dashboard.activeAlerts,
      value: alerts.length || 1,
      icon: AlertTriangle,
      color: 'text-amber-600',
      bg: 'bg-amber-50 border-amber-200',
    },
  ]

  return (
    <div className="space-y-6 py-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs text-muted-foreground">{greeting}</p>
          <h1 className="text-2xl font-bold">{t.dashboard.title}</h1>
          <p className="text-xs text-muted-foreground">{t.dashboard.subtitle}</p>
        </div>
        <Link to="/planner">
          <Button size="sm" className="font-semibold text-xs">
            {t.dashboard.planNewRoute}
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((kpi, i) => (
          <Card key={i} className="shadow-subtle">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">{kpi.label}</p>
                <p className="text-2xl font-bold mt-1">{kpi.value}</p>
              </div>
              <div className={`p-2.5 rounded-lg border ${kpi.bg} ${kpi.color}`}>
                <kpi.icon className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <DashboardCharts />

      <div className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-subtle">
        <h2 className="text-base font-semibold">{t.shipments.activeFreight}</h2>
        <div className="space-y-3">
          {shipments.length > 0 ? (
            shipments.map((s) => (
              <div
                key={s.id}
                className="p-4 bg-secondary/50 border border-border rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">
                      {s.commodity_name} ({s.load_weight_lb?.toLocaleString()} lbs)
                    </span>
                    <RiskBadge level="low" />
                  </div>
                  <p className="text-muted-foreground">
                    {s.origin_name} → {s.destination_name}
                  </p>
                </div>
                <Link to="/details">
                  <Button size="sm" variant="outline" className="text-xs">
                    {t.shipments.viewDetails}
                  </Button>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-xs text-muted-foreground">{t.dashboard.noShipments}</p>
          )}
        </div>
      </div>
    </div>
  )
}
