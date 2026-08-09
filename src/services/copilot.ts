import pb from '@/lib/pocketbase/client'

export const sendCopilotMessage = (message: string, conversationId?: string | null) =>
  pb.send<any>('/backend/v1/copilot/message', {
    method: 'POST',
    body: JSON.stringify({ message, conversation_id: conversationId }),
    headers: { 'Content-Type': 'application/json' },
  })
