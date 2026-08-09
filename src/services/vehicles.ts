import pb from '@/lib/pocketbase/client'

export interface Vehicle {
  id: string
  owner: string
  name: string
  vehicle_type: string
  trailer_type: string
  empty_weight_lb: number
  cargo_weight_lb: number
  gross_weight_lb: number
  axles: number
  axle_config: string
  height_ft: number
  width_ft: number
  length_ft: number
  is_default: boolean
}

export const getVehicles = () =>
  pb.collection('vehicles').getFullList<Vehicle>({ sort: '-created' })

export const createVehicle = (data: Partial<Vehicle>) =>
  pb.collection('vehicles').create<Vehicle>(data)

export const updateVehicle = (id: string, data: Partial<Vehicle>) =>
  pb.collection('vehicles').update<Vehicle>(id, data)

export const deleteVehicle = (id: string) => pb.collection('vehicles').delete(id)
