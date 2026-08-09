migrate(
  (app) => {
    var adminUser
    try {
      adminUser = app.findAuthRecordByEmail('_pb_users_auth_', '1aspiraqualquer@gmail.com')
    } catch (e) {
      return
    }

    var restCol = app.findCollectionByNameOrId('restrictions')
    var restrictionsData = [
      {
        type: 'bridge',
        title: 'IA-210 Skunk River Bridge Weight Restriction',
        description: 'Posted at 34 tons maximum gross weight due to deck maintenance.',
        severity: 'high',
        max_weight_tons: 34,
        source: 'Iowa DOT - Demo Data',
        status: 'active',
        confidence: 'high',
        data_class: 'verified',
        lat: 41.98,
        lng: -93.58,
      },
      {
        type: 'weight',
        title: 'County Rd E29 Seasonal Thaw Limit',
        description: 'Spring frost law restriction active. 10 ton axle weight max.',
        severity: 'moderate',
        max_weight_tons: 10,
        source: 'Story County Hwy Dept',
        status: 'active',
        confidence: 'medium',
        data_class: 'estimated',
        lat: 42.03,
        lng: -93.65,
      },
      {
        type: 'construction',
        title: 'US-30 Culvert Replacement',
        description: 'Single lane alternating traffic with 12ft width restriction.',
        severity: 'moderate',
        source: 'Iowa DOT - Demo Data',
        status: 'active',
        confidence: 'high',
        data_class: 'verified',
        lat: 42.01,
        lng: -93.42,
      },
    ]

    restrictionsData.forEach(function (r) {
      try {
        app.findFirstRecordByData('restrictions', 'title', r.title)
      } catch (e) {
        var rec = new Record(restCol)
        Object.keys(r).forEach(function (k) {
          rec.set(k, r[k])
        })
        app.save(rec)
      }
    })

    var storCol = app.findCollectionByNameOrId('storage_facilities')
    var storageData = [
      {
        name: 'Ames Grain Cooperative Elevator',
        facility_type: 'elevator',
        distance_miles: 18.2,
        capacity_pct: 72,
        fee_per_bushel: 0.08,
        commodity_compatibility: 'Corn, Soybeans, Wheat',
        transport_risk: 'low',
        lat: 42.02,
        lng: -93.61,
      },
      {
        name: 'Story City Regional Grain Terminal',
        facility_type: 'storage',
        distance_miles: 41.5,
        capacity_pct: 91,
        fee_per_bushel: 0.05,
        commodity_compatibility: 'Corn, Soybeans',
        transport_risk: 'medium',
        lat: 42.18,
        lng: -93.59,
      },
      {
        name: 'Des Moines River Processing Facility',
        facility_type: 'processor',
        distance_miles: 34.0,
        capacity_pct: 64,
        fee_per_bushel: 0.06,
        commodity_compatibility: 'Corn, Produce',
        transport_risk: 'low',
        lat: 41.59,
        lng: -93.6,
      },
    ]

    storageData.forEach(function (s) {
      try {
        app.findFirstRecordByData('storage_facilities', 'name', s.name)
      } catch (e) {
        var rec2 = new Record(storCol)
        Object.keys(s).forEach(function (k) {
          rec2.set(k, s[k])
        })
        app.save(rec2)
      }
    })

    var backCol = app.findCollectionByNameOrId('backhaul_loads')
    var backData = [
      {
        origin_name: 'Des Moines, IA',
        destination_name: 'Ames, IA',
        commodity: 'Dry Fertilizer',
        weight_lb: 46000,
        rate_usd: 480,
        pickup_window: 'Today 2:00 PM',
        status: 'open',
      },
      {
        origin_name: 'Nevada, IA',
        destination_name: 'Marshalltown, IA',
        commodity: 'Seed Bags',
        weight_lb: 38000,
        rate_usd: 520,
        pickup_window: 'Tomorrow 8:00 AM',
        status: 'open',
      },
    ]

    backData.forEach(function (b) {
      try {
        app.findFirstRecordByData('backhaul_loads', 'commodity', b.commodity)
      } catch (e) {
        var rec3 = new Record(backCol)
        Object.keys(b).forEach(function (k) {
          rec3.set(k, b[k])
        })
        app.save(rec3)
      }
    })

    var alertCol = app.findCollectionByNameOrId('alerts')
    try {
      app.findFirstRecordByData('alerts', 'title', 'Harvest Surge Congestion Warning')
    } catch (e) {
      var a = new Record(alertCol)
      a.set('owner', adminUser.id)
      a.set('type', 'route_warning')
      a.set('title', 'Harvest Surge Congestion Warning')
      a.set('message', 'Story City elevator line waiting time currently exceeds 45 minutes.')
      a.set('severity', 'warning')
      a.set('read', false)
      app.save(a)
    }

    try {
      $ai.agents.putTools(app, 'rooted-copilot', [
        { collection: 'routes', perms: { list: true, read: true } },
      ])
    } catch (e) {}
  },
  (app) => {},
)
