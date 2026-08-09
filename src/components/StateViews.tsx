import { Loader2, AlertTriangle, Inbox } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function LoadingState({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center space-y-3">
        <Loader2 className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
        <p className="text-sm text-zinc-400">{label}</p>
      </div>
    </div>
  )
}

export function ErrorState({
  message = 'Something went wrong while loading this information.',
  onRetry,
}: {
  message?: string
  onRetry?: () => void
}) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center space-y-3 max-w-sm">
        <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto" />
        <p className="text-sm text-zinc-300">{message}</p>
        {onRetry && (
          <Button
            size="sm"
            variant="outline"
            onClick={onRetry}
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
          >
            Try Again
          </Button>
        )}
      </div>
    </div>
  )
}

export function EmptyState({ message = 'No data available' }: { message?: string }) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center space-y-2">
        <Inbox className="w-8 h-8 text-zinc-600 mx-auto" />
        <p className="text-sm text-zinc-400">{message}</p>
      </div>
    </div>
  )
}
