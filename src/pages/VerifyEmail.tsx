import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import pb from '@/lib/pocketbase/client'
import { useI18n } from '@/hooks/use-i18n'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function VerifyEmail() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const { t } = useI18n()
  const [status, setStatus] = useState(t.auth.verifying)
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      pb.collection('users')
        .confirmVerification(token)
        .then(() => {
          setStatus(t.auth.verifiedSuccess)
          setTimeout(() => navigate('/dashboard'), 2000)
        })
        .catch(() => setStatus(t.auth.verifiedFailed))
    }
  }, [token, navigate, t.auth.verifiedSuccess, t.auth.verifiedFailed])

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Card className="w-full max-w-md text-center shadow-elevation">
        <CardHeader>
          <CardTitle className="text-xl">{t.auth.verifyEmailTitle}</CardTitle>
          <CardDescription className="text-sm mt-2">{status}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
