import pb from '@/lib/pocketbase/client'

export interface BackhaulLoad {
  id: string
  origin_name: string
  destination_name: string
  commodity: string
  weight_lb: number
  rate_usd: number
  pickup_window: string
  status: 'open' | 'matched' | 'closed'
}

export const getBackhaulLoads = () =>
  pb.collection('backhaul_loads').getFullList<BackhaulLoad>({ sort: '-created' })
