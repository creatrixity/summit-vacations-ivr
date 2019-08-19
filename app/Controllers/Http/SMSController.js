'use strict';

const SMSRepository = use('App/Repositories/SMSRepository')

/**
 * Routes various IVR actions to handlers
 */
class SMSController {
  /**
   * Show welcome greeting
   * @return {String}
   */
  async postWelcome() {
    const ivrRepo = new IvrRepository()
    return ivrRepo.showWelcomeGreeting()
  }

  /**
   * Process a response for a keyword.
   * @param  {Object}  request  HTTP request object
   * @return {String}
   */
  async postProcessResponse({ request }) {
    const smsRepo = new SMSRepository()
    return smsRepo.createResponseForKeyword(request.input('Body'), {
      texterPhone: request.input('To')
    })
  }
}

module.exports = SMSController
