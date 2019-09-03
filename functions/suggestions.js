'use strict'

const IvrRepository = require('../app/Repositories/IvrRepository')

exports.handler = (event, context, callback) => {
  const { Digits } = JSON.parse(event.body)
  const ivrRepo = new IvrRepository()
  const body = ivrRepo.navigateActivitySuggestions(parseInt(Digits))

  return callback(null, {
    statusCode: 200,
    body
  })
}
