routerAdd(
  'POST',
  '/backend/v1/routes/compare',
  (e) => {
    const body = e.requestInfo().body || {}
    const scenario = body.scenario || 'standard'

    let impact = {
      scenario,
      summary: 'Standard highway baseline conditions.',
      cost_delta_pct: 0,
      time_delta_mins: 0,
      risk_change: 'none',
      actionable_advice: 'Maintain planned dispatch schedule.',
    }

    if (scenario === 'rail_unavailable') {
      impact = {
        scenario: 'Rail Grain Shuttle Unavailable',
        summary:
          'Regional rail terminal outage redirects 40% more bulk traffic to local grain terminals.',
        cost_delta_pct: +14,
        time_delta_mins: +25,
        risk_change: 'moderate',
        actionable_advice:
          'Reroute to regional river storage or schedule off-peak early morning dispatch.',
      }
    } else if (scenario === 'bridge_closure') {
      impact = {
        scenario: 'Emergency Bridge Weight Drop',
        summary: 'Local County bridge reduced to 15 tons effective immediately.',
        cost_delta_pct: +18,
        time_delta_mins: +30,
        risk_change: 'high',
        actionable_advice: 'Shift primary routing to Route B state corridor bypass immediately.',
      }
    } else if (scenario === 'harvest_surge') {
      impact = {
        scenario: 'Harvest Arrives 10 Days Early',
        summary: 'Harvest peak causes 2-hour queue at main destination elevator.',
        cost_delta_pct: +22,
        time_delta_mins: +75,
        risk_change: 'moderate',
        actionable_advice:
          'Consider alternate Story City processor elevator with 91% available capacity.',
      }
    }

    return e.json(200, impact)
  },
  $apis.requireAuth(),
)
