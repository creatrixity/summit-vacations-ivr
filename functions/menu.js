'use strict'

const IvrRepository = require('../app/Repositories/IvrRepository')
const { pickQueryStringValue } = require('../app/Utilities/String')

exports.handler = (event, context, callback) => {
  const params = event.body
  // const Digits = pickQueryStringValue('Digits', params)
  // const To = pickQueryStringValue('To', params)

  console.log({ body: params, params: JSON.stringify(event.queryParameters) })

  const ivrRepo = new IvrRepository()
  // const body = ivrRepo.navigateMainMenu(parseInt(Digits), { callerPhone: To })

  return callback(null, {
    statusCode: 200,
    body: 'Hello'
  })
}
