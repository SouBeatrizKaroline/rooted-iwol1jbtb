import pb from '@/lib/pocketbase/client'

export interface Carrier {
  id: string
  owner: string
  name: string
  vehicle_type: string
  trailer_type: string
  capacity_lb: number
  service_regions: string
  cargo_types: string
  availability: 'available' | 'busy' | 'offline'
  preferred_routes: string
  estimated_cost_per_mile: number
  home_base_name: string
  home_base_lat: number
  home_base_lng: number
}

export const getCarriers = () => pb.collection('carriers').getFullList<Carrier>({ sort: 'name' })

export const getAvailableCarriers = () =>
  pb.collection('carriers').getFullList<Carrier>({
    filter: "availability = 'available'",
    sort: 'name',
  })

export const createCarrier = (data: Partial<Carrier>) =>
  pb.collection('carriers').create<Carrier>(data)

export const updateCarrier = (id: string, data: Partial<Carrier>) =>
  pb.collection('carriers').update<Carrier>(id, data)
