import pb from '@/lib/pocketbase/client'

export interface AlertItem {
  id: string
  owner: string
  type: string
  title: string
  message: string
  severity: 'info' | 'warning' | 'critical'
  read: boolean
  created: string
}

export const getAlerts = () => pb.collection('alerts').getFullList<AlertItem>({ sort: '-created' })

export const markAlertRead = (id: string) => pb.collection('alerts').update(id, { read: true })
