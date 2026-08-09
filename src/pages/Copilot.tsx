import { useState, useRef, useEffect } from 'react'
import { Bot, Send, Loader2, Mic } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { streamCopilotMessage } from '@/services/copilot'
import { useI18n } from '@/hooks/use-i18n'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function Copilot() {
  const { t } = useI18n()
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
        onChunk: (_delta, full) =>
          setMessages((m) => {
            const updated = [...m]
            updated[updated.length - 1] = { role: 'assistant' as const, content: full }
            return updated
          }),
      })
      setConversationId(result.conversation_id)
    } catch (err: any) {
      setMessages((m) => {
        const updated = [...m]
        updated[updated.length - 1] = {
          role: 'assistant' as const,
          content: err.message || t.copilot.couldNotVerify,
        }
        return updated
      })
    } finally {
      setLoading(false)
    }
  }

  const quickActions = [
    { label: t.copilot.findRoute, path: '/planner' },
    { label: t.copilot.registerLoad, path: '/planner' },
    { label: t.copilot.findCarrier, path: '/backhaul' },
    { label: t.copilot.explore, path: '/demo' },
  ]

  return (
    <div className="max-w-3xl mx-auto space-y-4 py-2">
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <div className="bg-primary p-1.5 rounded-lg text-primary-foreground">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold">{t.copilot.title}</h1>
          <p className="text-xs text-muted-foreground">{t.copilot.subtitle}</p>
        </div>
      </div>
      <div className="bg-card border border-border rounded-2xl h-[420px] md:h-[500px] p-4 flex flex-col shadow-subtle">
        <div ref={scrollRef} className="overflow-y-auto space-y-3 pr-2 flex-1">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={cn(
                'p-3 rounded-xl text-xs leading-relaxed max-w-[85%]',
                m.role === 'user'
                  ? 'bg-primary text-primary-foreground ml-auto'
                  : 'bg-secondary border border-border text-foreground',
              )}
            >
              {m.content || (loading && idx === messages.length - 1 ? t.copilot.analyzing : '')}
            </div>
          ))}
        </div>
        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 py-2 border-t border-border">
            {quickActions.map((action, i) => (
              <Link key={i} to={action.path}>
                <Button variant="outline" size="sm" className="text-[11px]">
                  {action.label}
                </Button>
              </Link>
            ))}
          </div>
        )}
        <div className="flex gap-2 pt-3 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0 text-muted-foreground"
            aria-label={t.copilot.listen}
          >
            <Mic className="w-4 h-4" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.copilot.placeholder}
            className="text-xs"
            disabled={loading}
          />
          <Button onClick={() => handleSend()} disabled={loading} size="sm">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  )
}
