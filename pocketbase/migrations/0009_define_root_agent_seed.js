migrate(
  (app) => {
    try {
      $ai.agents.define(app, {
        slug: 'root',
        name: 'Root',
        description:
          'Agricultural freight assistant for load-aware routing, restrictions, storage, carriers, and cost optimization.',
        systemPrompt:
          'You are Root, an intelligent agricultural freight assistant for American agriculture. You are friendly, professional, accessible, and trustworthy. You explain complex logistics in plain language. You refuse to fabricate data — if you lack information, say "I could not verify this information." You cite sources when available. You help users find routes, register loads, find carriers, evaluate storage, and understand infrastructure risks. You never execute irreversible actions (cancel load, confirm hire, change destination) without explicit confirmation. You respond in the user\'s selected language (pt-BR, en, or es). Always label routing decisions as decision-support guidance and remind users: "Always verify applicable permits and temporary restrictions before dispatch."',
        tier: 'fast',
        tools: [
          { collection: 'shipments', perms: { list: true, read: true } },
          { collection: 'vehicles', perms: { list: true, read: true } },
          { collection: 'restrictions', perms: { list: true, read: true } },
          { collection: 'storage_facilities', perms: { list: true, read: true } },
          { collection: 'backhaul_loads', perms: { list: true, read: true } },
          { collection: 'routes', perms: { list: true, read: true } },
          { collection: 'alerts', perms: { list: true, read: true } },
          { collection: 'carriers', perms: { list: true, read: true } },
          { collection: 'inventory', perms: { list: true, read: true } },
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
              text: 'Rooted is a B2B agricultural freight decision support platform. All calculations are Demo Data estimates unless explicitly connected to live DOT/USDA telemetry. Root is the AI assistant brand — never call it Copilot or AgRoute.',
            },
          },
        ],
      })
    } catch (e) {
      console.log('Failed to define root agent:', e)
    }

    try {
      app.findAuthRecordByEmail('_pb_users_auth_', 'demo@rooted.app')
    } catch (e) {
      try {
        var usersCol = app.findCollectionByNameOrId('_pb_users_auth_')
        var demoRec = new Record(usersCol)
        demoRec.setEmail('demo@rooted.app')
        demoRec.setPassword('demodemo')
        demoRec.setVerified(true)
        demoRec.set('name', 'Demo User')
        demoRec.set('role', 'logistics_manager')
        demoRec.set('language', 'pt-BR')
        demoRec.set('units', 'us')
        demoRec.set('onboarded', true)
        app.save(demoRec)
      } catch (err) {
        console.log('Failed to create demo user:', err)
      }
    }

    try {
      var carrierCol = app.findCollectionByNameOrId('carriers')
      var demoUser = app.findAuthRecordByEmail('_pb_users_auth_', 'demo@rooted.app')

      var carriersData = [
        {
          name: 'Hawkeye Grain Transport',
          vehicle_type: 'Semi Tractor',
          trailer_type: 'Grain Hopper',
          capacity_lb: 80000,
          service_regions: 'IA, IL, NE',
          cargo_types: 'Corn, Soybeans, Wheat',
          availability: 'available',
          estimated_cost_per_mile: 3.25,
          home_base_name: 'Ames, IA',
          home_base_lat: 42.03,
          home_base_lng: -93.62,
        },
        {
          name: 'Prairie State Carriers',
          vehicle_type: 'Semi Tractor',
          trailer_type: 'Flatbed',
          capacity_lb: 78000,
          service_regions: 'IL, IA, KS',
          cargo_types: 'Produce, Cotton, Packaged',
          availability: 'available',
          estimated_cost_per_mile: 3.5,
          home_base_name: 'Decatur, IL',
          home_base_lat: 39.84,
          home_base_lng: -88.95,
        },
        {
          name: 'Cornhusker Freight Co',
          vehicle_type: 'Semi Tractor',
          trailer_type: 'Grain Hopper',
          capacity_lb: 80000,
          service_regions: 'NE, KS, IA',
          cargo_types: 'Corn, Soybeans, Rice',
          availability: 'busy',
          estimated_cost_per_mile: 3.1,
          home_base_name: 'Lincoln, NE',
          home_base_lat: 40.82,
          home_base_lng: -96.7,
        },
      ]

      carriersData.forEach(function (c) {
        try {
          app.findFirstRecordByData('carriers', 'name', c.name)
        } catch (e2) {
          var rec = new Record(carrierCol)
          if (demoUser) rec.set('owner', demoUser.id)
          Object.keys(c).forEach(function (k) {
            rec.set(k, c[k])
          })
          app.save(rec)
        }
      })
    } catch (e) {
      console.log('Failed to seed carriers:', e)
    }

    try {
      var invCol = app.findCollectionByNameOrId('inventory')
      var inventoryData = [
        {
          commodity_name: 'Corn',
          facility_name: 'Ames Grain Cooperative',
          current_quantity_bu: 120000,
          incoming_quantity_bu: 25000,
          outgoing_quantity_bu: 15000,
          capacity_bu: 180000,
          available_capacity_bu: 60000,
          projected_overflow_days: 14,
          region: 'IA',
        },
        {
          commodity_name: 'Soybeans',
          facility_name: 'Story City Terminal',
          current_quantity_bu: 85000,
          incoming_quantity_bu: 10000,
          outgoing_quantity_bu: 8000,
          capacity_bu: 150000,
          available_capacity_bu: 65000,
          projected_overflow_days: 30,
          region: 'IA',
        },
        {
          commodity_name: 'Wheat',
          facility_name: 'Des Moines River Processing',
          current_quantity_bu: 45000,
          incoming_quantity_bu: 5000,
          outgoing_quantity_bu: 12000,
          capacity_bu: 90000,
          available_capacity_bu: 45000,
          projected_overflow_days: 0,
          region: 'IA',
        },
      ]

      inventoryData.forEach(function (inv) {
        try {
          app.findFirstRecordByData('inventory', 'facility_name', inv.facility_name)
        } catch (e2) {
          var rec2 = new Record(invCol)
          Object.keys(inv).forEach(function (k) {
            rec2.set(k, inv[k])
          })
          app.save(rec2)
        }
      })
    } catch (e) {
      console.log('Failed to seed inventory:', e)
    }
  },
  (app) => {
    try {
      $ai.agents.delete(app, 'root')
    } catch (e) {}
    try {
      var demoRec = app.findAuthRecordByEmail('_pb_users_auth_', 'demo@rooted.app')
      app.delete(demoRec)
    } catch (e) {}
  },
)
