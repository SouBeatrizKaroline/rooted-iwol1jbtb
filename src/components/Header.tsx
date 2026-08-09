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
  User,
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

export function Header() {
  const { user, isAuthenticated, signOut } = useAuth()
  const { t } = useI18n()
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur border-b border-zinc-800 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-emerald-600 p-1.5 rounded-lg text-zinc-950">
            <Wheat className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-white tracking-tight">Rooted</span>
              <Badge
                variant="outline"
                className="text-[10px] px-1.5 py-0 border-emerald-800 bg-emerald-950/40 text-emerald-400"
              >
                Demo
              </Badge>
            </div>
            <span className="text-[10px] text-zinc-400 -mt-1 hidden sm:inline">
              Agricultural Freight Intelligence
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        {isAuthenticated && (
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <Link
              to="/dashboard"
              className="px-3 py-1.5 rounded-md text-zinc-300 hover:text-white hover:bg-zinc-900 flex items-center gap-1.5"
            >
              <BarChart2 className="w-4 h-4 text-emerald-400" />
              <span>{t.nav.dashboard}</span>
            </Link>
            <Link
              to="/planner"
              className="px-3 py-1.5 rounded-md text-zinc-300 hover:text-white hover:bg-zinc-900 flex items-center gap-1.5"
            >
              <Truck className="w-4 h-4 text-emerald-400" />
              <span>{t.nav.planRoute}</span>
            </Link>
            <Link
              to="/storage"
              className="px-3 py-1.5 rounded-md text-zinc-300 hover:text-white hover:bg-zinc-900 flex items-center gap-1.5"
            >
              <Warehouse className="w-4 h-4 text-emerald-400" />
              <span>{t.nav.storage}</span>
            </Link>
            <Link
              to="/backhaul"
              className="px-3 py-1.5 rounded-md text-zinc-300 hover:text-white hover:bg-zinc-900 flex items-center gap-1.5"
            >
              <ArrowLeftRight className="w-4 h-4 text-emerald-400" />
              <span>{t.nav.backhaul}</span>
            </Link>
            <Link
              to="/copilot"
              className="px-3 py-1.5 rounded-md text-zinc-300 hover:text-white hover:bg-zinc-900 flex items-center gap-1.5"
            >
              <Bot className="w-4 h-4 text-emerald-400" />
              <span>{t.nav.copilot}</span>
            </Link>
          </nav>
        )}

        {/* Actions / User Menu */}
        <div className="flex items-center gap-3">
          <LanguageSelector />

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 px-2 gap-2 text-zinc-200 hover:bg-zinc-900">
                  <div className="w-7 h-7 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-xs font-bold text-emerald-300">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-xs font-medium hidden sm:inline">
                    {user?.name || user?.email}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-zinc-900 border-zinc-800 text-zinc-100 w-48"
              >
                <DropdownMenuItem
                  onClick={() => navigate('/settings')}
                  className="hover:bg-zinc-800 cursor-pointer"
                >
                  <Settings className="w-4 h-4 mr-2 text-zinc-400" />
                  <span>{t.nav.settings}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    signOut()
                    navigate('/')
                  }}
                  className="hover:bg-zinc-800 cursor-pointer text-rose-400"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>{t.nav.signOut}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/signin">
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs"
              >
                {t.nav.signIn}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
