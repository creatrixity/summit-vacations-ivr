'use strict'

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = require('../app/Services/EnvService')

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Twilio Phone Origin
  |--------------------------------------------------------------------------
  |
  */
  phoneOrigin: Env.get('TWILIO_PHONE_ORIGIN', '+12056198558'),

  /*
  |--------------------------------------------------------------------------
  | Twilio Account SID
  |--------------------------------------------------------------------------
  |
  */
  accountSid: Env.get('TWILIO_ACCOUNT_SID', 'ACe45a8ae524f3735029997b50a0dcfd28'),

  /*
  |--------------------------------------------------------------------------
  | Twilio Account Token
  |--------------------------------------------------------------------------
  |
  */
  authToken: Env.get('TWILIO_AUTH_TOKEN', '83247e328b4d498c559686765e72d776'),
}
