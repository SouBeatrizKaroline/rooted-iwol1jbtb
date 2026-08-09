import { useState, useRef, useEffect } from 'react'
import { Bot, Send, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { streamCopilotMessage } from '@/services/copilot'
import { useI18n } from '@/hooks/use-i18n'
import { useAuth } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function FloatingAssistant() {
  const { t } = useI18n()
  const { isAuthenticated } = useAuth()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: t.copilot.greeting },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])
  useEffect(() => {
    if (!open) return
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [open])

  if (!isAuthenticated) return null

  const handleSend = async (text?: string) => {
    const userMsg = (text || input).trim()
    if (!userMsg || loading) return
    setInput('')
    setMessages((m) => [
      ...m,
      { role: 'user', content: userMsg },
      { role: 'assistant', content: '' },
    ])
    setLoading(true)
    try {
      const result = await streamCopilotMessage(userMsg, conversationId, {
        onChunk: (_d, full) =>
          setMessages((m) => {
            const u = [...m]
            u[u.length - 1] = { role: 'assistant' as const, content: full }
            return u
          }),
      })
      setConversationId(result.conversation_id)
    } catch (err: any) {
      setMessages((m) => {
        const u = [...m]
        u[u.length - 1] = {
          role: 'assistant' as const,
          content: err.message || t.copilot.couldNotVerify,
        }
        return u
      })
    } finally {
      setLoading(false)
    }
  }

  const suggestions = [t.copilot.findRoute, t.copilot.registerLoad, t.copilot.findCarrier]

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          'fixed z-40 w-12 h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground',
          'flex items-center justify-center shadow-elevation transition-all hover:scale-105',
          'bottom-20 right-20 md:bottom-4 md:right-20',
          open && 'hidden',
        )}
        aria-label={t.copilot.askRoot}
      >
        <Bot className="w-5 h-5" />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end md:items-stretch md:justify-end">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div
            className="relative z-10 bg-card border border-border rounded-t-2xl md:rounded-l-2xl w-full md:w-[380px] h-[70vh] md:h-full flex flex-col animate-slide-up"
            role="dialog"
            aria-label={t.copilot.title}
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="bg-primary p-1.5 rounded-lg text-primary-foreground">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold">{t.copilot.title}</h2>
                  <p className="text-[10px] text-muted-foreground">{t.copilot.subtitle}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    'p-2.5 rounded-xl text-xs max-w-[85%]',
                    m.role === 'user'
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-secondary border border-border text-foreground',
                  )}
                >
                  {m.content || (loading && i === messages.length - 1 ? t.copilot.analyzing : '')}
                </div>
              ))}
              {messages.length <= 1 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(s)}
                      className="text-[10px] px-2.5 py-1.5 rounded-lg bg-secondary border border-border text-muted-foreground hover:border-primary/30 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="p-3 border-t border-border flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t.copilot.placeholder}
                className="text-xs h-9"
                disabled={loading}
                aria-label={t.copilot.placeholder}
              />
              <Button
                onClick={() => handleSend()}
                disabled={loading}
                size="sm"
                className="h-9 w-9 p-0"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
