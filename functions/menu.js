'use strict'

const IvrRepository = require('../app/Repositories/IvrRepository')

exports.handler = (event, context, callback) => {
  const { Digits, To } = event.queryStringParameters

  const ivrRepo = new IvrRepository()
  const body = ivrRepo.navigateMainMenu(parseInt(Digits), { callerPhone: To })

  return callback(null, {
    statusCode: 200,
    body
  })
}
