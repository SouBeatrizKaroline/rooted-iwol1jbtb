routerAdd('POST', '/backend/v1/demo-login', (e) => {
  try {
    var demoUser = $app.findAuthRecordByEmail('_pb_users_auth_', 'demo@rooted.app')
    $apis.recordAuthResponse(e, demoUser)
  } catch (err) {
    return e.json(404, { error: 'Demo account not available' })
  }
})
