import { Outlet } from 'react-router-dom'
import { Header } from '@/components/Header'
import { MobileNav } from '@/components/MobileNav'
import { OfflineBanner } from '@/components/OfflineBanner'
import { DemoBanner } from '@/components/DemoBanner'
import { ComplianceDisclaimer } from '@/components/ComplianceDisclaimer'
import { AccessibilityPanel } from '@/components/AccessibilityPanel'
import { FloatingAssistant } from '@/components/FloatingAssistant'
import { useI18n } from '@/hooks/use-i18n'
import { useAuth } from '@/hooks/use-auth'

export default function Layout() {
  const { t, isRTL } = useI18n()
  const { isDemoMode } = useAuth()

  return (
    <div
      className="min-h-screen bg-background text-foreground flex flex-col font-sans antialiased"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <OfflineBanner />
      {isDemoMode && <DemoBanner />}
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-8">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-secondary/50 py-6 px-4 text-xs text-muted-foreground">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-semibold text-foreground/80">
              {t.appName} — {t.tagline}
            </p>
            <ComplianceDisclaimer />
          </div>
          <div className="flex items-center gap-4 text-muted-foreground text-[11px]">
            <span>{t.demoBadge}</span>
          </div>
        </div>
      </footer>

      <MobileNav />
      <AccessibilityPanel />
      <FloatingAssistant />
    </div>
  )
}
