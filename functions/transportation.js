'use strict'

const IvrRepository = require('../app/Repositories/IvrRepository')

exports.handler = (event, context, callback) => {
  const { Digits } = JSON.parse(decodeURI(event.body))
  const ivrRepo = new IvrRepository()
  const body = ivrRepo.manageTransportationSuggestionsPrompts(parseInt(Digits))

  return callback(null, {
    statusCode: 200,
    body
  })
}
