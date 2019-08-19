'use strict';

const { accountSid, accountToken } = require('../../config/twilio')

class TwilioService {
  static async sendTextMessage (from, to, body) {
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
