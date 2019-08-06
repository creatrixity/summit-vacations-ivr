'use strict';

const twilio = require('twilio')
const { VoiceResponse, MessagingResponse } = twilio.twiml

const Config = use('Config')
const TwilioService = use('TwilioService')

const dialogConfig = Config.get('dialog')
const { phoneOrigin } = Config.get('twilio')
const { routes } = Config.get('routeMap')

class SMSRepository {
  /**
   * Tries to figure out the best response for when it receives a keyword.
   * @param  {String} keyword - The keyword for the user request.
   * @return {String} TwiML XML string
   */
  async createResponseForKeyword(keyword, extraParams) {
    const defaultResponse = 'Reply with the any of these for more: weather info, activity suggestions'
    const keywordHandlers = {
      'weather': this.sendWeatherInfoResponse,
      'activity': this.sendActivitySuggestionsResponse
    }
    let validKeyword = ''

    Object.keys(keywordHandlers).map(keywordHandlerKey => {
      if (keyword.trim().split(' ').includes(keywordHandlerKey)) {
        validKeyword = keywordHandlerKey;
        return;
      }
    })

    if (validKeyword.length) return keywordHandlers[validKeyword](extraParams)

    return defaultResponse
  }

  /**
   * Allow texters get the weather report link.
   * @param  {Object} extraParams - Request parameters object
   * @return {Void} TwiML XML string
   */
  async sendWeatherInfoResponse(extraParams) {
    await TwilioService.sendTextMessage(
      phoneOrigin,
      extraParams.texterPhone,
      dialogConfig.weatherInfoSms
    )

    return dialogConfig.weatherInfoSms
  }

  /**
   * Allow texters get activity suggestions.
   * @param  {Object} extraParams - Request parameters object
   * @return {Void} TwiML XML string
   */
  async sendActivitySuggestionsResponse(extraParams) {
    await TwilioService.sendTextMessage(
      phoneOrigin,
      extraParams.texterPhone,
      dialogConfig.excursionsInfoSms
    )

    return dialogConfig.excursionsInfoSms
  }
}

module.exports = SMSRepository;
