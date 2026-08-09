migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('_pb_users_auth_')

    if (!col.fields.getByName('role')) {
      col.fields.add(
        new SelectField({
          name: 'role',
          values: [
            'producer',
            'carrier',
            'cooperative',
            'buyer',
            'logistics_manager',
            'storage_operator',
            'other',
          ],
          maxSelect: 1,
        }),
      )
    }

    if (!col.fields.getByName('language')) {
      col.fields.add(
        new SelectField({
          name: 'language',
          values: ['en', 'es', 'pt-BR'],
          maxSelect: 1,
        }),
      )
    }

    if (!col.fields.getByName('units')) {
      col.fields.add(
        new SelectField({
          name: 'units',
          values: ['us', 'metric'],
          maxSelect: 1,
        }),
      )
    }

    if (!col.fields.getByName('onboarded')) {
      col.fields.add(new BoolField({ name: 'onboarded' }))
    }

    col.listRule = 'id = @request.auth.id'
    col.viewRule = 'id = @request.auth.id'
    col.updateRule = 'id = @request.auth.id'

    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('_pb_users_auth_')
    col.fields.removeByName('role')
    col.fields.removeByName('language')
    col.fields.removeByName('units')
    col.fields.removeByName('onboarded')
    app.save(col)
  },
)
