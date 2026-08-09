import { Link, useNavigate } from 'react-router-dom'
import {
  Wheat,
  Truck,
  BarChart2,
  Warehouse,
  ArrowLeftRight,
  Bot,
  Settings,
  LogOut,
} from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { useI18n } from '@/hooks/use-i18n'
import { LanguageSelector } from '@/components/LanguageSelector'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useLocation } from 'react-router-dom'

export function Header() {
  const { user, isAuthenticated, signOut } = useAuth()
  const { t } = useI18n()
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { to: '/dashboard', icon: BarChart2, label: t.navigation?.dashboard ?? 'Overview' },
    { to: '/planner', icon: Truck, label: t.navigation?.planRoute ?? 'Plan a Route' },
    { to: '/storage', icon: Warehouse, label: t.navigation?.storage ?? 'Storage' },
    { to: '/backhaul', icon: ArrowLeftRight, label: t.navigation?.backhaul ?? 'Backhaul' },
    { to: '/copilot', icon: Bot, label: t.navigation?.root ?? 'Root' },
  ]

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-14">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="bg-primary p-1.5 rounded-lg text-primary-foreground">
            <Wheat className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-foreground tracking-tight">Rooted</span>
              <Badge
                variant="outline"
                className="text-[10px] px-1.5 py-0 border-primary/30 bg-primary/5 text-primary"
              >
                {t.demoBadge}
              </Badge>
            </div>
            <span className="text-[10px] text-muted-foreground -mt-1 hidden sm:inline">
              {t.tagline}
            </span>
          </div>
        </Link>

        {isAuthenticated && (
          <nav className="hidden md:flex items-center gap-0.5 text-sm font-medium">
            {navItems.map((item) => {
              const active = location.pathname === item.to
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    'px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors',
                    active
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary',
                  )}
                >
                  <item.icon className={cn('w-4 h-4', active && 'text-primary')} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        )}

        <div className="flex items-center gap-3">
          <LanguageSelector />
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 px-2 gap-2 hover:bg-secondary">
                  <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-xs font-medium hidden sm:inline text-foreground">
                    {user?.name || user?.email}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
                  <Settings className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>{t.navigation?.settings ?? 'Settings'}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    signOut()
                    navigate('/')
                  }}
                  className="cursor-pointer text-destructive"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>{t.navigation?.signOut ?? 'Sign Out'}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/signin">
              <Button size="sm" className="font-medium text-xs">
                {t.navigation?.signIn ?? 'Sign In'}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
