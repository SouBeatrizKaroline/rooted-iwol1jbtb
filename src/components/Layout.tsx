import { Outlet } from 'react-router-dom'
import { Header } from '@/components/Header'
import { MobileNav } from '@/components/MobileNav'
import { OfflineBanner } from '@/components/OfflineBanner'
import { ComplianceDisclaimer } from '@/components/ComplianceDisclaimer'
import { AccessibilityPanel } from '@/components/AccessibilityPanel'
import { useI18n } from '@/hooks/use-i18n'

export default function Layout() {
  const { t, isRTL } = useI18n()

  return (
    <div
      className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <OfflineBanner />
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 pb-20 md:pb-8">
        <Outlet />
      </main>

      <footer className="border-t border-zinc-800/80 bg-zinc-950 py-6 px-4 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-semibold text-zinc-400">
              {t.appName} — {t.tagline}
            </p>
            <ComplianceDisclaimer />
          </div>
          <div className="flex items-center gap-4 text-zinc-400 text-[11px]">
            <span>{t.demoBadge}</span>
          </div>
        </div>
      </footer>

      <MobileNav />
      <AccessibilityPanel />
    </div>
  )
}
