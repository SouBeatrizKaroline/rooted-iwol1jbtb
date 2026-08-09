migrate(
  (app) => {
    var authId = '_pb_users_auth_'
    var shipmentsColId = app.findCollectionByNameOrId('shipments').id

    if (!app.hasTable('restrictions')) {
      app.save(
        new Collection({
          name: 'restrictions',
          type: 'base',
          listRule: '',
          viewRule: '',
          createRule: "@request.auth.id != ''",
          updateRule: "@request.auth.id != ''",
          deleteRule: "@request.auth.id != ''",
          fields: [
            {
              name: 'type',
              type: 'select',
              values: ['bridge', 'weight', 'road', 'seasonal', 'construction'],
              maxSelect: 1,
              required: true,
            },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'text' },
            {
              name: 'severity',
              type: 'select',
              values: ['low', 'moderate', 'high', 'blocked'],
              maxSelect: 1,
              required: true,
            },
            { name: 'max_weight_tons', type: 'number' },
            { name: 'source', type: 'text' },
            { name: 'last_verified', type: 'date' },
            { name: 'status', type: 'select', values: ['active', 'estimated'], maxSelect: 1 },
            { name: 'confidence', type: 'select', values: ['high', 'medium', 'low'], maxSelect: 1 },
            {
              name: 'data_class',
              type: 'select',
              values: ['verified', 'estimated', 'predicted', 'user_provided', 'unavailable'],
              maxSelect: 1,
            },
            { name: 'lat', type: 'number' },
            { name: 'lng', type: 'number' },
            { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
            { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
          ],
        }),
      )
    }

    if (!app.hasTable('storage_facilities')) {
      app.save(
        new Collection({
          name: 'storage_facilities',
          type: 'base',
          listRule: '',
          viewRule: '',
          createRule: "@request.auth.id != ''",
          updateRule: "@request.auth.id != ''",
          deleteRule: "@request.auth.id != ''",
          fields: [
            { name: 'name', type: 'text', required: true },
            {
              name: 'facility_type',
              type: 'select',
              values: ['elevator', 'storage', 'processor'],
              maxSelect: 1,
              required: true,
            },
            { name: 'distance_miles', type: 'number' },
            { name: 'capacity_pct', type: 'number' },
            { name: 'fee_per_bushel', type: 'number' },
            { name: 'commodity_compatibility', type: 'text' },
            {
              name: 'transport_risk',
              type: 'select',
              values: ['low', 'medium', 'high'],
              maxSelect: 1,
            },
            { name: 'lat', type: 'number' },
            { name: 'lng', type: 'number' },
            { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
            { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
          ],
        }),
      )
    }

    if (!app.hasTable('backhaul_loads')) {
      app.save(
        new Collection({
          name: 'backhaul_loads',
          type: 'base',
          listRule: '',
          viewRule: '',
          createRule: "@request.auth.id != ''",
          updateRule: "@request.auth.id != ''",
          deleteRule: "@request.auth.id != ''",
          fields: [
            { name: 'origin_name', type: 'text', required: true },
            { name: 'destination_name', type: 'text', required: true },
            { name: 'commodity', type: 'text', required: true },
            { name: 'weight_lb', type: 'number' },
            { name: 'rate_usd', type: 'number' },
            { name: 'pickup_window', type: 'text' },
            { name: 'status', type: 'select', values: ['open', 'matched', 'closed'], maxSelect: 1 },
            { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
            { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
          ],
        }),
      )
    }

    if (!app.hasTable('routes')) {
      app.save(
        new Collection({
          name: 'routes',
          type: 'base',
          listRule: "@request.auth.id != ''",
          viewRule: "@request.auth.id != ''",
          createRule: "@request.auth.id != ''",
          updateRule: "@request.auth.id != ''",
          deleteRule: "@request.auth.id != ''",
          fields: [
            { name: 'shipment', type: 'relation', collectionId: shipmentsColId, maxSelect: 1 },
            {
              name: 'mode',
              type: 'select',
              values: ['recommended', 'cheapest', 'fastest', 'safest'],
              maxSelect: 1,
              required: true,
            },
            { name: 'distance_miles', type: 'number', required: true },
            { name: 'estimated_cost_usd', type: 'number', required: true },
            { name: 'estimated_time_minutes', type: 'number', required: true },
            {
              name: 'risk_level',
              type: 'select',
              values: ['low', 'moderate', 'high', 'blocked'],
              maxSelect: 1,
              required: true,
            },
            { name: 'compatibility_status', type: 'json' },
            { name: 'recommendation_reason', type: 'text' },
            {
              name: 'data_source',
              type: 'select',
              values: ['demo', 'estimated', 'verified'],
              maxSelect: 1,
              required: true,
            },
            { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
            { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
          ],
          indexes: ['CREATE INDEX idx_routes_shipment ON routes (shipment)'],
        }),
      )
    }

    if (!app.hasTable('alerts')) {
      app.save(
        new Collection({
          name: 'alerts',
          type: 'base',
          listRule: "@request.auth.id != '' && owner = @request.auth.id",
          viewRule: "@request.auth.id != '' && owner = @request.auth.id",
          createRule: "@request.auth.id != ''",
          updateRule: "@request.auth.id != '' && owner = @request.auth.id",
          deleteRule: "@request.auth.id != '' && owner = @request.auth.id",
          fields: [
            { name: 'owner', type: 'relation', collectionId: authId, maxSelect: 1, required: true },
            { name: 'shipment', type: 'relation', collectionId: shipmentsColId, maxSelect: 1 },
            { name: 'type', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
            { name: 'message', type: 'text', required: true },
            {
              name: 'severity',
              type: 'select',
              values: ['info', 'warning', 'critical'],
              maxSelect: 1,
              required: true,
            },
            { name: 'read', type: 'bool' },
            { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
            { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
          ],
          indexes: ['CREATE INDEX idx_alerts_owner ON alerts (owner)'],
        }),
      )
    }
  },
  (app) => {
    var names = ['alerts', 'routes', 'backhaul_loads', 'storage_facilities', 'restrictions']
    for (var i = 0; i < names.length; i++) {
      try {
        var col = app.findCollectionByNameOrId(names[i])
        app.delete(col)
      } catch (e) {}
    }
  },
)
