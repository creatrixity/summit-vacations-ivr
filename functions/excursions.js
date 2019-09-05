'use strict'

const IvrRepository = require('../app/Repositories/IvrRepository')

exports.handler = (event, context, callback) => {
  const { Digits, To } = JSON.parse(decodeURI(event.body))
  const ivrRepo = new IvrRepository()
  const body = ivrRepo.manageExcursionSuggestionsPrompts(parseInt(Digits), { callerPhone: To })

  return callback(null, {
    statusCode: 200,
    body
  })
}
