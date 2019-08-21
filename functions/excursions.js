'use strict'

const IvrRepository = require('../app/Repositories/IvrRepository')

exports.handler = (event, context, callback) => {
  const { Digits, To } = JSON.parse(event.body)
  const ivrRepo = new IvrRepository()
  const body = ivrRepo.manageExcursionSuggestionsPrompts(Digits, { callerPhone: To })

  console.log(body)

  return callback(null, {
    statusCode: 200,
    body: 'hey'
  })
}
