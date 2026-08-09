routerAdd(
  'POST',
  '/backend/v1/copilot/message',
  (e) => {
    const userId = e.auth?.id
    if (!userId) return e.unauthorizedError('Authentication required')

    const body = e.requestInfo().body || {}
    const message = body.message
    if (!message || !message.trim()) return e.badRequestError('Message is required')

    try {
      const agent = $ai.agent('root')
      const conv = agent.getOrCreateConversation({
        user_id: userId,
        id: body.conversation_id || null,
      })

      if (body.stream) {
        const iter = agent.chat({
          user_id: userId,
          conversation_id: conv.id,
          message: message,
          stream: true,
        })
        e.response.header().set('Content-Type', 'text/event-stream')
        e.response.header().set('Cache-Control', 'no-cache')
        e.response.header().set('X-Conversation-Id', conv.id)
        $response.stream(e, iter)
        return
      }

      const result = agent.chat({
        user_id: userId,
        conversation_id: conv.id,
        message: message,
      })

      return e.json(200, {
        conversation_id: result.conversation_id,
        content: result.content,
        citations: result.citations || [],
        message_id: result.message_id,
      })
    } catch (err) {
      if (err instanceof SkipAiConfigError) {
        return e.json(503, { error: 'AI service temporarily unavailable' })
      }
      if (err instanceof SkipAiAgentsError) {
        const status = err.status || 500
        return e.json(status, { error: status >= 500 ? 'agent request failed' : err.message })
      }
      if (err instanceof SkipAiError) {
        const status = err.status || 502
        return e.json(status, { error: status >= 500 ? 'AI temporarily unavailable' : err.message })
      }
      return e.json(500, { error: err.message || 'Failed to process Root request' })
    }
  },
  $apis.requireAuth(),
)
