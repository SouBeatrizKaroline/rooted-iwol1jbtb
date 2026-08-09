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
  { name: 'Active', value: 3, fill: 'hsl(34 100% 44%)' },
  { name: 'Completed', value: 8, fill: 'hsl(189 100% 38%)' },
  { name: 'Draft', value: 2, fill: 'hsl(209 100% 32%)' },
]

const costConfig: ChartConfig = { cost: { label: 'Cost', color: 'hsl(34 100% 44%)' } }
const statusConfig: ChartConfig = { value: { label: 'Shipments' } }

export function DashboardCharts() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-zinc-200 mb-4">Weekly Transportation Costs</h3>
        <ChartContainer config={costConfig} className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={costData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="week" stroke="#71717a" fontSize={11} />
              <YAxis stroke="#71717a" fontSize={11} />
              <Tooltip
                contentStyle={{
                  background: '#18181b',
                  border: '1px solid #3f3f46',
                  borderRadius: '8px',
                  color: '#e4e4e7',
                }}
              />
              <Bar dataKey="cost" fill="hsl(34 100% 44%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-zinc-200 mb-4">Shipment Status Distribution</h3>
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
                  background: '#18181b',
                  border: '1px solid #3f3f46',
                  borderRadius: '8px',
                  color: '#e4e4e7',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="flex items-center justify-center gap-4 mt-2 text-xs">
          {statusData.map((s, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.fill }} />
              <span className="text-zinc-400">
                {s.name}: {s.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
