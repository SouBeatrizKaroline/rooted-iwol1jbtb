import pb from '@/lib/pocketbase/client'

export interface Shipment {
  id: string
  owner: string
  commodity_name: string
  load_weight_lb: number
  estimated_value_usd?: number
  origin_name: string
  destination_name: string
  status: 'draft' | 'active' | 'completed' | 'cancelled'
  created: string
  updated: string
}

export const getShipments = () =>
  pb.collection('shipments').getFullList<Shipment>({ sort: '-created' })

export const getShipment = (id: string) => pb.collection('shipments').getOne<Shipment>(id)

export const createShipment = (data: Partial<Shipment>) =>
  pb.collection('shipments').create<Shipment>(data)

export const updateShipment = (id: string, data: Partial<Shipment>) =>
  pb.collection('shipments').update<Shipment>(id, data)

export const deleteShipment = (id: string) => pb.collection('shipments').delete(id)
