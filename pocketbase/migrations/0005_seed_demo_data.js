migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    let adminUser
    try {
      adminUser = app.findAuthRecordByEmail('_pb_users_auth_', '1aspiraqualquer@gmail.com')
    } catch (_) {
      adminUser = new Record(users)
      adminUser.setEmail('1aspiraqualquer@gmail.com')
      adminUser.setPassword('Skip@Pass')
      adminUser.setVerified(true)
      adminUser.set('name', 'Demo Fleet Manager')
      adminUser.set('role', 'logistics_manager')
      adminUser.set('language', 'en')
      adminUser.set('units', 'us')
      adminUser.set('onboarded', true)
      app.save(adminUser)
    }

    const commCol = app.findCollectionByNameOrId('commodities')
    const commData = [
      { name: 'Corn', category: 'grain', icon: '🌽', default_unit: 'bushels' },
      { name: 'Soybeans', category: 'grain', icon: '🌱', default_unit: 'bushels' },
      { name: 'Wheat', category: 'grain', icon: '🌾', default_unit: 'bushels' },
      { name: 'Potatoes', category: 'produce', icon: '🥔', default_unit: 'cwt' },
      { name: 'Fresh Produce', category: 'produce', icon: '🍅', default_unit: 'crates' },
      { name: 'Other Ag Cargo', category: 'other', icon: '📦', default_unit: 'lbs' },
    ]

    commData.forEach((item) => {
      try {
        app.findFirstRecordByData('commodities', 'name', item.name)
      } catch (_) {
        const rec = new Record(commCol)
        rec.set('name', item.name)
        rec.set('category', item.category)
        rec.set('icon', item.icon)
        rec.set('default_unit', item.default_unit)
        app.save(rec)
      }
    })

    const vehCol = app.findCollectionByNameOrId('vehicles')
    try {
      app.findFirstRecordByData('vehicles', 'name', 'Standard Grain Hopper (5-Axle)')
    } catch (_) {
      const v = new Record(vehCol)
      v.set('owner', adminUser.id)
      v.set('name', 'Standard Grain Hopper (5-Axle)')
      v.set('vehicle_type', 'Class 8 Semi')
      v.set('trailer_type', 'Grain Hopper')
      v.set('empty_weight_lb', 31000)
      v.set('cargo_weight_lb', 49000)
      v.set('gross_weight_lb', 80000)
      v.set('axles', 5)
      v.set('axle_config', '3S2')
      v.set('height_ft', 13.5)
      v.set('width_ft', 8.5)
      v.set('length_ft', 65)
      v.set('is_default', true)
      app.save(v)
    }

    const restCol = app.findCollectionByNameOrId('restrictions')
    const restrictionsData = [
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

    restrictionsData.forEach((r) => {
      try {
        app.findFirstRecordByData('restrictions', 'title', r.title)
      } catch (_) {
        const rec = new Record(restCol)
        Object.keys(r).forEach((k) => rec.set(k, r[k]))
        app.save(rec)
      }
    })

    const storCol = app.findCollectionByNameOrId('storage_facilities')
    const storageData = [
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

    storageData.forEach((s) => {
      try {
        app.findFirstRecordByData('storage_facilities', 'name', s.name)
      } catch (_) {
        const rec = new Record(storCol)
        Object.keys(s).forEach((k) => rec.set(k, s[k]))
        app.save(rec)
      }
    })

    const backCol = app.findCollectionByNameOrId('backhaul_loads')
    const backData = [
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

    backData.forEach((b) => {
      try {
        app.findFirstRecordByData('backhaul_loads', 'commodity', b.commodity)
      } catch (_) {
        const rec = new Record(backCol)
        Object.keys(b).forEach((k) => rec.set(k, b[k]))
        app.save(rec)
      }
    })

    const shipCol = app.findCollectionByNameOrId('shipments')
    try {
      app.findFirstRecordByData('shipments', 'origin_name', 'Ames, IA Farm 4')
    } catch (_) {
      const s = new Record(shipCol)
      s.set('owner', adminUser.id)
      s.set('commodity_name', 'Corn')
      s.set('load_weight_lb', 48000)
      s.set('estimated_value_usd', 22500)
      s.set('origin_name', 'Ames, IA Farm 4')
      s.set('destination_name', 'Des Moines Grain Elevator')
      s.set('status', 'active')
      app.save(s)
    }

    const alertCol = app.findCollectionByNameOrId('alerts')
    try {
      app.findFirstRecordByData('alerts', 'title', 'Harvest Surge Congestion Warning')
    } catch (_) {
      const a = new Record(alertCol)
      a.set('owner', adminUser.id)
      a.set('type', 'route_warning')
      a.set('title', 'Harvest Surge Congestion Warning')
      a.set('message', 'Story City elevator line waiting time currently exceeds 45 minutes.')
      a.set('severity', 'warning')
      a.set('read', false)
      app.save(a)
    }
  },
  (app) => {},
)
