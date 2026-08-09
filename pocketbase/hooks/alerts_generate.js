onRecordAfterCreateSuccess((e) => {
  try {
    const shipment = e.record
    if (shipment.getNumber('load_weight_lb') > 70000) {
      const alertCol = $app.findCollectionByNameOrId('alerts')
      const rec = new Record(alertCol)
      rec.set('owner', shipment.getString('owner'))
      rec.set('shipment', shipment.id)
      rec.set('type', 'weight_warning')
      rec.set('title', 'Heavy Load Infrastructure Check')
      rec.set(
        'message',
        `Shipment #${shipment.id.slice(0, 6)} weighs ${shipment.getNumber('load_weight_lb').toLocaleString()} lbs. Route B is recommended to avoid bridge restrictions.`,
      )
      rec.set('severity', 'warning')
      rec.set('read', false)
      $app.save(rec)
    }
  } catch (err) {
    $app.logger().error('alerts_generate failed', 'error', String(err))
  }
  return e.next()
}, 'shipments')
