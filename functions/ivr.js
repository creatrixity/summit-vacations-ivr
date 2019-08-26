'use strict'

const IvrRepository = require('../app/Repositories/IvrRepository')

exports.handler = (event, context, callback) => {
  const ivrRepo = new IvrRepository()
  const body = JSON.stringify(ivrRepo.showWelcomeGreeting());

  return callback(null, {
    statusCode: 200,
    body
  })
}
