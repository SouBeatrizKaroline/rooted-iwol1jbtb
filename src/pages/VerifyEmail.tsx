import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import pb from '@/lib/pocketbase/client'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function VerifyEmail() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [status, setStatus] = useState('Verifying email address...')
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      pb.collection('users')
        .confirmVerification(token)
        .then(() => {
          setStatus('Email verified successfully! Redirecting...')
          setTimeout(() => navigate('/dashboard'), 2000)
        })
        .catch(() => setStatus('Email verification link is invalid or expired.'))
    }
  }, [token, navigate])

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 text-zinc-100 text-center">
        <CardHeader>
          <CardTitle className="text-xl">Email Verification</CardTitle>
          <CardDescription className="text-zinc-300 text-sm mt-2">{status}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
