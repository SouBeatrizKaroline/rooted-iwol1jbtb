import { useState, useEffect } from 'react'
import { WifiOff } from 'lucide-react'
import { useI18n } from '@/hooks/use-i18n'

export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
  const { t } = useI18n()

  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (!isOffline) return null
  return (
    <div className="bg-amber-600 text-white text-xs py-1 px-4 text-center flex items-center justify-center gap-2 font-medium z-50">
      <WifiOff className="w-3.5 h-3.5" />
      <span>{t.common.offlineNotice}</span>
    </div>
  )
}
