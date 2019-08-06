'use strict';

const IvrRepository = use('App/Repositories/IvrRepository')

/**
 * Routes various IVR actions to handlers
 */
class IvrController {
  /**
   * Show welcome greeting
   * @return {String}
   */
  async postWelcome() {
    const ivrRepo = new IvrRepository()
    return ivrRepo.showWelcomeGreeting()
  }

  /**
   * Process menu navigation requests
   * @param  {Object}  request  HTTP request object
   * @return {String}
   */
  async postMenu({ request }) {
    const ivrRepo = new IvrRepository()
    return ivrRepo.navigateMainMenu(request.input('Digits'), {
      callerPhone: request.input('To')
    })
  }

  /**
   * Process activity suggestions menu navigation requests
   * @param  {Object}  request  HTTP request object
   * @return {String}
   */
  async postActivitySuggestions({ request }) {
    const ivrRepo = new IvrRepository()
    return ivrRepo.navigateActivitySuggestions(request.input('Digits'))
  }

  /**
   * Process suggestions for transportation
   * @param  {Object}  request  HTTP request object
   * @return {String}
   */
  async postTransportationSuggestions({ request }) {
    const ivrRepo = new IvrRepository()
    return ivrRepo.manageTransportationSuggestionsPrompts(request.input('Digits'))
  }

  /**
   * Process suggestions for excursion
   * @param  {Object}  request  HTTP request object
   * @return {String}
   */
  async postExcursionSuggestions({ request }) {
    const ivrRepo = new IvrRepository()
    return ivrRepo.manageExcursionSuggestionsPrompts(request.input('Digits'), {
      callerPhone: request.input('To')
    })
  }

  /**
   * Process assistance menu navigation requests
   * @param  {Object}  request  HTTP request object
   * @return {String}
   */
  async postAssistance({ request }) {
    const ivrRepo = new IvrRepository()
    return ivrRepo.handleAssistanceInfoRequest(request.input('Digits'))
  }
}

module.exports = IvrController
