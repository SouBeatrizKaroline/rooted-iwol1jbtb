import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider } from '@/hooks/use-auth'
import { I18nProvider } from '@/hooks/use-i18n'
import { ProtectedRoute } from '@/components/ProtectedRoute'

import Layout from '@/components/Layout'
import Index from '@/pages/Index'
import Demo from '@/pages/Demo'
import SignIn from '@/pages/SignIn'
import SignUp from '@/pages/SignUp'
import ForgotPassword from '@/pages/ForgotPassword'
import ResetPassword from '@/pages/ResetPassword'
import VerifyEmail from '@/pages/VerifyEmail'
import ConfirmEmailChange from '@/pages/ConfirmEmailChange'
import Onboarding from '@/pages/Onboarding'
import RoutePlanner from '@/pages/RoutePlanner'
import RouteResults from '@/pages/RouteResults'
import RouteDetails from '@/pages/RouteDetails'
import Dashboard from '@/pages/Dashboard'
import Storage from '@/pages/Storage'
import Backhaul from '@/pages/Backhaul'
import Copilot from '@/pages/Copilot'
import Settings from '@/pages/Settings'
import NotFound from '@/pages/NotFound'

const App = () => (
  <BrowserRouter>
    <I18nProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/confirm-email-change" element={<ConfirmEmailChange />} />
              <Route
                path="/onboarding"
                element={
                  <ProtectedRoute>
                    <Onboarding />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/planner"
                element={
                  <ProtectedRoute>
                    <RoutePlanner />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/results"
                element={
                  <ProtectedRoute>
                    <RouteResults />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/details"
                element={
                  <ProtectedRoute>
                    <RouteDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/storage"
                element={
                  <ProtectedRoute>
                    <Storage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/backhaul"
                element={
                  <ProtectedRoute>
                    <Backhaul />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/copilot"
                element={
                  <ProtectedRoute>
                    <Copilot />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </I18nProvider>
  </BrowserRouter>
)

export default App
