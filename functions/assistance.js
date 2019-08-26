'use strict'

const IvrRepository = require('../app/Repositories/IvrRepository')

exports.handler = (event, context, callback) => {
  const { Digits } = event.queryStringParameters
  const ivrRepo = new IvrRepository()
  const body = ivrRepo.handleAssistanceInfoRequest(Digits)

  return callback(null, {
    statusCode: 200,
    body
  })
}
