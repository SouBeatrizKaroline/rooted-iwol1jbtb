import { useAuth } from '@/hooks/use-auth'
import { useI18n } from '@/hooks/use-i18n'
import { LanguageSelector } from '@/components/LanguageSelector'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function Settings() {
  const { user } = useAuth()
  const { t } = useI18n()

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-2">
      <h1 className="text-2xl font-bold text-white">{t.settings.title}</h1>

      <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
        <CardHeader>
          <CardTitle className="text-base">{t.settings.userAccount}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs text-zinc-300">
          <p>
            {t.auth.email}: <span className="font-semibold text-white">{user?.email}</span>
          </p>
          <p>
            {t.settings.role}:{' '}
            <span className="font-semibold text-white capitalize">
              {user?.role || 'Logistics Manager'}
            </span>
          </p>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
        <CardHeader>
          <CardTitle className="text-base">{t.settings.languageUnits}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-300">{t.settings.preferences}</span>
            <LanguageSelector />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
