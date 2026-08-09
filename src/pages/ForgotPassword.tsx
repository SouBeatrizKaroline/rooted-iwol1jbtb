import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { useI18n } from '@/hooks/use-i18n'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { requestPasswordReset } = useAuth()
  const { t } = useI18n()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await requestPasswordReset(email)
    setLoading(false)
    toast.success(t.auth.resetSent)
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Card className="w-full max-w-md shadow-elevation">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t.auth.resetPasswordTitle}</CardTitle>
          <CardDescription className="text-xs">{t.auth.resetPasswordDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <Label className="text-xs">{t.auth.email}</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                required
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? t.auth.sending : t.auth.sendResetLink}
            </Button>
            <div className="text-center text-xs pt-2">
              <Link to="/signin" className="text-primary hover:underline">
                {t.auth.backToSignIn}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
