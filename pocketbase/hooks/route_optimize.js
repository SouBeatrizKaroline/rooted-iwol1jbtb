routerAdd(
  'POST',
  '/backend/v1/routes/optimize',
  (e) => {
    const body = e.requestInfo().body || {}
    const weight = Number(body.load_weight_lb || 48000)
    const grossWeight = weight + 31000

    const baseDistance = 44.5
    const isHeavy = grossWeight > 75000

    const routes = [
      {
        mode: 'recommended',
        name: 'Route B (US-69 via County Rd Highway)',
        distance_miles: baseDistance + 4.2,
        estimated_cost_usd: Math.round((baseDistance + 4.2) * 4.2 + 25),
        estimated_time_minutes: 52,
        risk_level: 'low',
        compatibility_status: [
          {
            label: 'Weight Compatible',
            pass: true,
            detail: `Gross weight ${grossWeight.toLocaleString()} lbs within 80,000 lbs limit`,
          },
          {
            label: 'Bridge Rating Pass',
            pass: true,
            detail: 'Crosses Skunk River via reinforced US-69 bridge',
          },
          {
            label: 'Axle Spacing Legal',
            pass: true,
            detail: 'Standard 3S2 5-axle bridge formula compliant',
          },
        ],
        recommendation_reason:
          'Route B avoids the IA-210 bridge weight restriction posted at 34 tons (68,000 lbs). Although 4.2 miles longer than Route A, it eliminates non-compliance risk and delivers low delay probability.',
        data_source: 'demo',
      },
      {
        mode: 'cheapest',
        name: 'Route A (Direct via IA-210 local bridge)',
        distance_miles: baseDistance,
        estimated_cost_usd: Math.round(baseDistance * 4.1 + 10),
        estimated_time_minutes: 48,
        risk_level: isHeavy ? 'high' : 'moderate',
        compatibility_status: [
          {
            label: 'Weight Compatible',
            pass: !isHeavy,
            detail: `Bridge posted at 68,000 lbs gross max. Your vehicle is ${grossWeight.toLocaleString()} lbs.`,
          },
          {
            label: 'Bridge Rating Warning',
            pass: false,
            detail: 'Exceeds IA-210 bridge posted limit',
          },
          {
            label: 'Local Permit Required',
            pass: false,
            detail: 'County road permit needed for spring thaw',
          },
        ],
        recommendation_reason:
          'Shortest mileage, but includes a posted bridge weight limit violation for vehicles over 68,000 lbs. Not recommended for standard full grain hoppers without permits.',
        data_source: 'demo',
      },
      {
        mode: 'fastest',
        name: 'Route C (I-35 North Express Bypass)',
        distance_miles: baseDistance + 11.0,
        estimated_cost_usd: Math.round((baseDistance + 11.0) * 4.5 + 40),
        estimated_time_minutes: 42,
        risk_level: 'moderate',
        compatibility_status: [
          {
            label: 'Interstate Axle Compatible',
            pass: true,
            detail: 'Fully rated Interstate highway corridor',
          },
          {
            label: 'Weather Sensitivity',
            pass: false,
            detail: 'Severe crosswind advisory on open prairie stretch',
          },
        ],
        recommendation_reason:
          'Fastest travel time due to highway speeds, but 11 miles longer with higher fuel usage and elevated wind risk during seasonal fronts.',
        data_source: 'demo',
      },
    ]

    return e.json(200, {
      routes,
      load_context: {
        load_weight_lb: weight,
        gross_weight_lb: grossWeight,
        origin: body.origin_name || 'Ames, IA',
        destination: body.destination_name || 'Des Moines, IA',
      },
      disclaimer:
        'Route compatibility based on available infrastructure and regulatory data. Always verify applicable permits and temporary restrictions before dispatch.',
    })
  },
  $apis.requireAuth(),
)
