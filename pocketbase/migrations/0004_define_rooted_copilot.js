migrate(
  (app) => {
    $ai.agents.define(app, {
      slug: 'rooted-copilot',
      name: 'Rooted Copilot',
      description:
        'Agricultural freight assistant for load-aware routing, restrictions, storage, and cost optimization.',
      systemPrompt:
        "You are Rooted Copilot, an expert agricultural freight decision-support AI for American agriculture. Help users analyze loads, vehicles, bridge/weight restrictions, storage options, and backhaul opportunities. Always explain route decisions clearly without jargon. Note: Always label routing decisions as decision-support guidance, and remind users: 'Always verify applicable permits and temporary restrictions before dispatch.'",
      tier: 'fast',
      tools: [
        { collection: 'shipments', perms: { list: true, read: true } },
        { collection: 'vehicles', perms: { list: true, read: true } },
        { collection: 'restrictions', perms: { list: true, read: true } },
        { collection: 'storage_facilities', perms: { list: true, read: true } },
        { collection: 'backhaul_loads', perms: { list: true, read: true } },
      ],
      memory: [
        {
          type: 'faq',
          payload: {
            qa: [
              {
                question: 'Why is load-aware routing important for grain trucks?',
                answer:
                  'An 80,000 lb 5-axle truck cannot take standard rural roads or posted bridges. Load-aware routing accounts for axle weights, trailer height, seasonal weight limits, and rural infrastructure.',
              },
              {
                question: 'How does Rooted calculate agricultural route risk?',
                answer:
                  'Rooted evaluates bridge weight ratings, active DOT construction, weather advisories, and road surface conditions to assign Low, Moderate, High, or Blocked risk levels.',
              },
              {
                question: 'What should I do before dispatching a heavy load?',
                answer:
                  'Always verify applicable state/county permits and temporary restrictions before dispatch.',
              },
            ],
          },
        },
        {
          type: 'text',
          payload: {
            text: 'Rooted is a B2B agricultural freight decision support platform. All calculations are Demo Data estimates unless explicitly connected to live DOT/USDA telemetry.',
          },
        },
      ],
    })
  },
  (app) => {
    try {
      $ai.agents.delete(app, 'rooted-copilot')
    } catch (_) {}
  },
)
