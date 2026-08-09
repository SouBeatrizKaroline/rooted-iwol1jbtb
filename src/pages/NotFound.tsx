import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '@/hooks/use-i18n'
import { Button } from '@/components/ui/button'

const NotFound = () => {
  const location = useLocation()
  const { t } = useI18n()

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname)
  }, [location.pathname])

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">404</h1>
        <p className="text-xl text-zinc-400">{t.errors?.genericError ?? 'Page not found'}</p>
        <Link to="/">
          <Button className="bg-emerald-600 hover:bg-emerald-500 text-white">
            {t.common?.back ?? 'Back to Home'}
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
