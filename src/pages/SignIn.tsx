import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Wheat } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { useI18n } from '@/hooks/use-i18n'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { toast } from 'sonner'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, demoSignIn } = useAuth()
  const { t } = useI18n()
  const navigate = useNavigate()
  const location = useLocation()
  const redirect = (location.state as any)?.redirect || '/dashboard'

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await signIn(email, password)
    setLoading(false)
    if (error) toast.error(t.auth.invalidCredentials)
    else {
      toast.success(t.notifications.welcomeBack)
      navigate(redirect)
    }
  }

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-8">
      <Card className="w-full max-w-md shadow-elevation">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground mb-2">
            <Wheat className="w-6 h-6 stroke-[2.5]" />
          </div>
          <CardTitle className="text-2xl font-bold">{t.auth.signInTitle}</CardTitle>
          <CardDescription className="text-xs">{t.auth.signInSubtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-1">
              <Label className="text-xs">{t.auth.email}</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <Label className="text-xs">{t.auth.password}</Label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                  {t.auth.forgotPassword}
                </Link>
              </div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full font-semibold">
              {loading ? t.auth.signingIn : t.auth.signIn}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 border-t border-border pt-4 text-xs text-muted-foreground">
          <div className="flex items-center justify-center">
            <span>{t.auth.noAccount} </span>
            <Link to="/signup" className="text-primary font-semibold ml-1 hover:underline">
              {t.auth.createAccount}
            </Link>
          </div>
          <div className="w-full pt-2 border-t border-border/50">
            <p className="text-center text-[10px] text-muted-foreground mb-2">
              Want to explore first?
            </p>
            <Button
              onClick={async () => {
                setLoading(true)
                const { error } = await demoSignIn()
                setLoading(false)
                if (error) toast.error('Demo mode unavailable')
                else {
                  toast.success('Demo mode activated')
                  navigate(redirect)
                }
              }}
              variant="outline"
              className="w-full text-xs"
            >
              Try Demo Mode
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
