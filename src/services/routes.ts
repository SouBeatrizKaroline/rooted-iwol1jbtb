import pb from '@/lib/pocketbase/client'

export interface OptimizedRoute {
  mode: 'recommended' | 'cheapest' | 'fastest' | 'safest'
  name: string
  distance_miles: number
  estimated_cost_usd: number
  estimated_time_minutes: number
  risk_level: 'low' | 'moderate' | 'high' | 'blocked'
  compatibility_status: Array<{ label: string; pass: boolean; detail: string }>
  recommendation_reason: string
  data_source: 'demo' | 'estimated' | 'verified'
}

export const optimizeRoute = (payload: {
  commodity: string
  load_weight_lb: number
  origin_name: string
  destination_name: string
  vehicle_id?: string
}) =>
  pb.send<{ routes: OptimizedRoute[]; load_context: any; disclaimer: string }>(
    '/backend/v1/routes/optimize',
    {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    },
  )

export const compareScenario = (scenario: string) =>
  pb.send<any>('/backend/v1/routes/compare', {
    method: 'POST',
    body: JSON.stringify({ scenario }),
    headers: { 'Content-Type': 'application/json' },
  })
