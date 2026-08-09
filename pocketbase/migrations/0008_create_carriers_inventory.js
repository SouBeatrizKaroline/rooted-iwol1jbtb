migrate(
  (app) => {
    var authId = '_pb_users_auth_'

    if (!app.hasTable('carriers')) {
      app.save(
        new Collection({
          name: 'carriers',
          type: 'base',
          listRule: '',
          viewRule: '',
          createRule: "@request.auth.id != ''",
          updateRule: "@request.auth.id != '' && owner = @request.auth.id",
          deleteRule: "@request.auth.id != '' && owner = @request.auth.id",
          fields: [
            { name: 'owner', type: 'relation', collectionId: authId, maxSelect: 1, required: true },
            { name: 'name', type: 'text', required: true },
            { name: 'vehicle_type', type: 'text' },
            { name: 'trailer_type', type: 'text' },
            { name: 'capacity_lb', type: 'number' },
            { name: 'service_regions', type: 'text' },
            { name: 'cargo_types', type: 'text' },
            {
              name: 'availability',
              type: 'select',
              values: ['available', 'busy', 'offline'],
              maxSelect: 1,
            },
            { name: 'preferred_routes', type: 'text' },
            { name: 'estimated_cost_per_mile', type: 'number' },
            { name: 'home_base_name', type: 'text' },
            { name: 'home_base_lat', type: 'number' },
            { name: 'home_base_lng', type: 'number' },
            { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
            { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
          ],
          indexes: [
            'CREATE INDEX idx_carriers_owner ON carriers (owner)',
            'CREATE INDEX idx_carriers_availability ON carriers (availability)',
          ],
        }),
      )
    }

    if (!app.hasTable('inventory')) {
      app.save(
        new Collection({
          name: 'inventory',
          type: 'base',
          listRule: "@request.auth.id != ''",
          viewRule: "@request.auth.id != ''",
          createRule: "@request.auth.id != ''",
          updateRule: "@request.auth.id != ''",
          deleteRule: "@request.auth.id != ''",
          fields: [
            { name: 'commodity_name', type: 'text', required: true },
            { name: 'facility_name', type: 'text' },
            { name: 'current_quantity_bu', type: 'number' },
            { name: 'incoming_quantity_bu', type: 'number' },
            { name: 'outgoing_quantity_bu', type: 'number' },
            { name: 'capacity_bu', type: 'number' },
            { name: 'available_capacity_bu', type: 'number' },
            { name: 'projected_overflow_days', type: 'number' },
            { name: 'region', type: 'text' },
            { name: 'embedding', type: 'vector', dimensions: 1536, distance: 'cosine' },
            { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
            { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
          ],
          indexes: [
            'CREATE INDEX idx_inventory_commodity ON inventory (commodity_name)',
            'CREATE INDEX idx_inventory_region ON inventory (region)',
          ],
        }),
      )
    }

    try {
      var restCol = app.findCollectionByNameOrId('restrictions')
      if (!restCol.fields.getByName('embedding')) {
        restCol.fields.add(
          new VectorField({ name: 'embedding', dimensions: 1536, distance: 'cosine' }),
        )
        app.save(restCol)
      }
    } catch (e) {}

    try {
      var shipCol = app.findCollectionByNameOrId('shipments')
      if (!shipCol.fields.getByName('embedding')) {
        shipCol.fields.add(
          new VectorField({ name: 'embedding', dimensions: 1536, distance: 'cosine' }),
        )
        app.save(shipCol)
      }
    } catch (e) {}

    try {
      var storCol = app.findCollectionByNameOrId('storage_facilities')
      if (!storCol.fields.getByName('embedding')) {
        storCol.fields.add(
          new VectorField({ name: 'embedding', dimensions: 1536, distance: 'cosine' }),
        )
        app.save(storCol)
      }
    } catch (e) {}
  },
  (app) => {
    var names = ['carriers', 'inventory']
    for (var i = 0; i < names.length; i++) {
      try {
        var col = app.findCollectionByNameOrId(names[i])
        app.delete(col)
      } catch (e) {}
    }
  },
)
