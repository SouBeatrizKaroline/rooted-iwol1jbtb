import pb from '@/lib/pocketbase/client'
import { streamAgentChat, type StreamAgentChatHandlers } from '@/lib/skipAi'

export const sendCopilotMessage = (message: string, conversationId?: string | null) =>
  pb.send<any>('/backend/v1/copilot/message', {
    method: 'POST',
    body: JSON.stringify({ message, conversation_id: conversationId }),
    headers: { 'Content-Type': 'application/json' },
  })

export async function streamCopilotMessage(
  message: string,
  conversationId: string | null,
  handlers: StreamAgentChatHandlers,
) {
  const res = await fetch(`${import.meta.env.VITE_POCKETBASE_URL}/backend/v1/copilot/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: pb.authStore.token || '',
    },
    body: JSON.stringify({ message, conversation_id: conversationId, stream: true }),
    signal: handlers.signal,
  })
  return streamAgentChat(res, handlers)
}
