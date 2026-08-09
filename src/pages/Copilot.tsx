import { useState, useRef, useEffect } from 'react'
import { Bot, Send, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { streamCopilotMessage } from '@/services/copilot'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function Copilot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hi, I'm Rooted Copilot. Tell me what you need to move and I'll analyze route bridge limits, weather risks, and nearby elevator capacities.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return
    const userMsg = input
    setInput('')
    setMessages((m) => [
      ...m,
      { role: 'user', content: userMsg },
      { role: 'assistant', content: '' },
    ])
    setLoading(true)

    try {
      const result = await streamCopilotMessage(userMsg, conversationId, {
        onChunk: (_delta, full) => {
          setMessages((m) => {
            const updated = [...m]
            updated[updated.length - 1] = { role: 'assistant' as const, content: full }
            return updated
          })
        },
      })
      setConversationId(result.conversation_id)
    } catch (err: any) {
      setMessages((m) => {
        const updated = [...m]
        updated[updated.length - 1] = {
          role: 'assistant' as const,
          content: err.message || 'Sorry, I encountered an error. Please try again.',
        }
        return updated
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4 py-2">
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
        <Bot className="w-6 h-6 text-emerald-400" />
        <div>
          <h1 className="text-xl font-bold text-white">Rooted Copilot</h1>
          <p className="text-xs text-zinc-400">Natural language agricultural logistics assistant</p>
        </div>
      </div>

      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl h-[450px] p-4 flex flex-col">
        <div ref={scrollRef} className="overflow-y-auto space-y-3 pr-2 flex-1">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl text-xs leading-relaxed max-w-[85%] ${m.role === 'user' ? 'bg-emerald-600 text-white ml-auto' : 'bg-zinc-950 border border-zinc-800 text-zinc-200'}`}
            >
              {m.content ||
                (loading && idx === messages.length - 1 ? 'Analyzing infrastructure...' : '')}
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-3 border-t border-zinc-800">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about heavy load routes, bridge limits, or storage..."
            className="bg-zinc-950 border-zinc-800 text-zinc-100 text-xs"
            disabled={loading}
          />
          <Button
            onClick={handleSend}
            disabled={loading}
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-500"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  )
}
