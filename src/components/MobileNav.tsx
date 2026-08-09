import { Link, useLocation } from 'react-router-dom'
import { BarChart2, Truck, Bot, Menu } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { useI18n } from '@/hooks/use-i18n'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

export function MobileNav() {
  const { isAuthenticated, signOut } = useAuth()
  const { t } = useI18n()
  const location = useLocation()

  if (!isAuthenticated) return null

  const isActive = (path: string) => location.pathname === path
  const navItems = [
    { path: '/dashboard', icon: BarChart2, label: t.navigation?.dashboard ?? 'Overview' },
    { path: '/planner', icon: Truck, label: t.navigation?.planRoute ?? 'Plan Route' },
    { path: '/copilot', icon: Bot, label: t.navigation?.root ?? 'Root' },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur border-t border-border px-2 py-1.5 flex items-center justify-around">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            'flex flex-col items-center gap-1 py-1 px-3 text-[11px] font-medium min-w-[64px] min-h-[48px] justify-center rounded-lg transition-colors',
            isActive(item.path) ? 'text-primary bg-primary/10' : 'text-muted-foreground',
          )}
        >
          <item.icon className="w-5 h-5" />
          <span>{item.label}</span>
        </Link>
      ))}
      <Sheet>
        <SheetTrigger asChild>
          <button className="flex flex-col items-center gap-1 py-1 px-3 text-[11px] font-medium text-muted-foreground min-w-[64px] min-h-[48px] justify-center">
            <Menu className="w-5 h-5" />
            <span>{t.navigation?.more ?? 'More'}</span>
          </button>
        </SheetTrigger>
        <SheetContent side="bottom" className="rounded-t-2xl">
          <SheetHeader>
            <SheetTitle className="text-left">{t.navigation?.more ?? 'More'}</SheetTitle>
          </SheetHeader>
          <div className="grid grid-cols-2 gap-3 py-4 text-sm font-medium">
            <Link to="/storage" className="p-3 bg-secondary rounded-lg border border-border">
              {t.navigation?.storage ?? 'Storage'}
            </Link>
            <Link to="/backhaul" className="p-3 bg-secondary rounded-lg border border-border">
              {t.navigation?.backhaul ?? 'Backhaul'}
            </Link>
            <Link to="/settings" className="p-3 bg-secondary rounded-lg border border-border">
              {t.navigation?.settings ?? 'Settings'}
            </Link>
            <button
              onClick={signOut}
              className="p-3 bg-destructive/5 text-destructive rounded-lg border border-destructive/20 text-left"
            >
              {t.navigation?.signOut ?? 'Sign Out'}
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
