import pb from '@/lib/pocketbase/client'

export interface InventoryItem {
  id: string
  commodity_name: string
  facility_name: string
  current_quantity_bu: number
  incoming_quantity_bu: number
  outgoing_quantity_bu: number
  capacity_bu: number
  available_capacity_bu: number
  projected_overflow_days: number
  region: string
}

export const getInventory = () =>
  pb.collection('inventory').getFullList<InventoryItem>({ sort: 'commodity_name' })
