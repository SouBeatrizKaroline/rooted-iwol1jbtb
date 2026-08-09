import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { ChartContainer, type ChartConfig } from '@/components/ui/chart'

const costData = [
  { week: 'Week 1', cost: 3850 },
  { week: 'Week 2', cost: 4120 },
  { week: 'Week 3', cost: 4850 },
  { week: 'Week 4', cost: 4480 },
]
const statusData = [
  { name: 'Active', value: 3, fill: 'hsl(142 39% 30%)' },
  { name: 'Completed', value: 8, fill: 'hsl(200 55% 40%)' },
  { name: 'Draft', value: 2, fill: 'hsl(40 62% 50%)' },
]
const costConfig: ChartConfig = { cost: { label: 'Cost', color: 'hsl(142 39% 30%)' } }
const statusConfig: ChartConfig = { value: { label: 'Shipments' } }

export function DashboardCharts() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-card border border-border rounded-xl p-5 shadow-subtle">
        <h3 className="text-sm font-semibold mb-4">Weekly Transportation Costs</h3>
        <ChartContainer config={costConfig} className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={costData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(120 12% 88%)" />
              <XAxis dataKey="week" stroke="hsl(138 7% 35%)" fontSize={11} />
              <YAxis stroke="hsl(138 7% 35%)" fontSize={11} />
              <Tooltip
                contentStyle={{
                  background: 'hsl(0 0% 100%)',
                  border: '1px solid hsl(120 12% 88%)',
                  borderRadius: '8px',
                  color: 'hsl(141 19% 11%)',
                }}
              />
              <Bar dataKey="cost" fill="hsl(142 39% 30%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      <div className="bg-card border border-border rounded-xl p-5 shadow-subtle">
        <h3 className="text-sm font-semibold mb-4">Shipment Status Distribution</h3>
        <ChartContainer config={statusConfig} className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                innerRadius={40}
              >
                {statusData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'hsl(0 0% 100%)',
                  border: '1px solid hsl(120 12% 88%)',
                  borderRadius: '8px',
                  color: 'hsl(141 19% 11%)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="flex items-center justify-center gap-4 mt-2 text-xs">
          {statusData.map((s, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.fill }} />
              <span className="text-muted-foreground">
                {s.name}: {s.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
