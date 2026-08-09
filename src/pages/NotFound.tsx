import { useLocation, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useI18n } from '@/hooks/use-i18n'
import { Button } from '@/components/ui/button'

const NotFound = () => {
  const location = useLocation()
  const { t } = useI18n()
  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname)
  }, [location.pathname])
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-xl text-muted-foreground">
          {t.errors?.genericError ?? 'Page not found'}
        </p>
        <Link to="/">
          <Button>{t.common?.back ?? 'Back to Home'}</Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
