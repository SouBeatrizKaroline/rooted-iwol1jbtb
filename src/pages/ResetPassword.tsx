import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { useI18n } from '@/hooks/use-i18n'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''
  const { confirmPasswordReset } = useAuth()
  const { t } = useI18n()
  const navigate = useNavigate()

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await confirmPasswordReset(token, password)
    if (error) toast.error(t.auth.passwordResetFailed)
    else {
      toast.success(t.auth.passwordUpdated)
      navigate('/signin')
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Card className="w-full max-w-md shadow-elevation">
        <CardHeader>
          <CardTitle className="text-xl">{t.auth.newPasswordTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleConfirm} className="space-y-4">
            <div>
              <Label className="text-xs">{t.auth.newPassword}</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {t.auth.updatePassword}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
