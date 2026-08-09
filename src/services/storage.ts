import pb from '@/lib/pocketbase/client'

export interface StorageFacility {
  id: string
  name: string
  facility_type: 'elevator' | 'storage' | 'processor'
  distance_miles: number
  capacity_pct: number
  fee_per_bushel: number
  commodity_compatibility: string
  transport_risk: 'low' | 'medium' | 'high'
}

export const getStorageFacilities = () =>
  pb.collection('storage_facilities').getFullList<StorageFacility>({ sort: 'distance_miles' })
