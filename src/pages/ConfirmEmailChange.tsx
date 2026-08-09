import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'

export default function ConfirmEmailChange() {
  const [password, setPassword] = useState('')
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''
  const { confirmEmailChange } = useAuth()
  const navigate = useNavigate()

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await confirmEmailChange(token, password)
    if (error) toast.error('Email change confirmation failed')
    else {
      toast.success('Email updated. Please sign in with your new email.')
      navigate('/signin')
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 text-zinc-100">
        <CardHeader>
          <CardTitle className="text-xl">Confirm Email Change</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleConfirm} className="space-y-4">
            <div>
              <Label className="text-xs">Current Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-zinc-950 border-zinc-800 text-zinc-100"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500">
              Confirm & Sign Out
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
