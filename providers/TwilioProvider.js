'use strict';

const { ServiceProvider } = require('@adonisjs/fold')

class TwilioProvider extends ServiceProvider {
  register () {
    const TwilioService = this.app.use('App/Services/TwilioService')

    this.app.bind('TwilioService', () => {
      return new TwilioService()
    })
  }
}

module.exports = TwilioProvider
