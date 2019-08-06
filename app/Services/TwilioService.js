'use strict';

const Config = use('Config')

const { accountSid, accountToken } = Config.get('twilio')

class TwilioService {
  async sendTextMessage (from, to, body) {
    try {
      const client = require('twilio')(accountSid, accountToken)
      await client
        .messages
        .create({
          body,
          from,
          to
        })
    } catch (err) {
      console.log('An error occurred: ', err)
    }
  }
}

module.exports = TwilioService
