import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Wheat } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { useI18n } from '@/hooks/use-i18n'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { toast } from 'sonner'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('logistics_manager')
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const { t } = useI18n()
  const navigate = useNavigate()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await signUp(email, password, role)
    setLoading(false)

    if (error) {
      toast.error(t.auth.signupFailed + ': ' + (error.message || ''))
    } else {
      toast.success(t.auth.accountCreated)
      navigate('/onboarding')
    }
  }

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-8">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 text-zinc-100">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-zinc-950 mb-2">
            <Wheat className="w-6 h-6 stroke-[2.5]" />
          </div>
          <CardTitle className="text-2xl font-bold">{t.auth.signUpTitle}</CardTitle>
          <CardDescription className="text-zinc-400 text-xs">
            {t.auth.signUpSubtitle}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-1">
              <Label className="text-xs text-zinc-300">{t.auth.email}</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="frota@coop.com"
                className="bg-zinc-950 border-zinc-800 text-zinc-100"
                required
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-zinc-300">{t.auth.password}</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-zinc-950 border-zinc-800 text-zinc-100"
                required
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-zinc-300">{t.auth.role}</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="bg-zinc-950 border-zinc-800 text-zinc-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                  <SelectItem value="producer">{t.onboarding.roles.producer}</SelectItem>
                  <SelectItem value="carrier">{t.onboarding.roles.carrier}</SelectItem>
                  <SelectItem value="cooperative">{t.onboarding.roles.cooperative}</SelectItem>
                  <SelectItem value="logistics_manager">
                    {t.onboarding.roles.logistics_manager}
                  </SelectItem>
                  <SelectItem value="storage_operator">
                    {t.onboarding.roles.storage_operator}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 font-semibold"
            >
              {loading ? t.auth.creatingAccount : t.auth.signUp}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center border-t border-zinc-800 pt-4 text-xs text-zinc-400">
          <span>{t.auth.alreadyRegistered} </span>
          <Link to="/signin" className="text-emerald-400 font-semibold ml-1 hover:underline">
            {t.auth.signIn}
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
