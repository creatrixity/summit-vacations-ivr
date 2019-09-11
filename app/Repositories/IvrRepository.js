'use strict';

const twilio = require('twilio');
const { VoiceResponse, MessagingResponse } = twilio.twiml;

const TwilioService = require('../Services/TwilioService');

const dialogConfig = require('../../config/dialog');
const { phoneOrigin } = require('../../config/twilio');
const { routes } = require('../../config/routeMap');

const endpointPrefix = '/.netlify/functions';

class IvrRepository {
  /**
   * Shows a welcome greeting
   * @return {String} welcome greeting
   */
  showWelcomeGreeting() {
    const voiceResp = new VoiceResponse();

    const gather = voiceResp.gather({
      action: `${endpointPrefix}/${routes.ivrMenu}`,
      numDigits: '1',
      method: 'POST'
    });

    gather.say(dialogConfig.welcomeGreeting, { loop: 1 });

    return voiceResp.toString();
  }

  /**
   * Maps menu options to handlers.
   * @param  {String} menuItem option id.
   * @param  {Object} extraParams - Request parameters object
   * @return {Function}          callback invoked
   */
  navigateMainMenu(menuItem, extraParams) {
    const optionsHandlers = {
      '1': this.showArrivalInfo,
      '2': this.showWeatherInfo,
      '3': this.showActivitySuggestionsGreeting,
      '4': this.showAssistanceInfo
    };

    return menuItem in optionsHandlers
      ? optionsHandlers[menuItem](extraParams)
      : this.showWelcomeGreeting();
  }

  /**
   * Allow callers to get their arrival info.
   * @param  {Object} extraParams - Request parameters object
   * @return {String} TwiML XML string
   */
  showArrivalInfo(extraParams) {
    const voiceResp = new VoiceResponse();

    voiceResp.say(dialogConfig.arrivalInfoGreeting);

    const gather = voiceResp.gather({
      action: `${endpointPrefix}/${routes.ivr}`,
      numDigits: '1',
      method: 'POST'
    });

    gather.say('To go to the previous menu, press any key');

    return voiceResp.toString();
  }

  /**
   * Allow callers get the weather report link.
   * @param  {Object} extraParams - Request parameters object
   * @return {String} TwiML XML string
   */
  showWeatherInfo(extraParams) {
    const voiceResp = new VoiceResponse();

    if ('callerPhone' in extraParams && extraParams.callerPhone) {
      TwilioService.sendTextMessage(
        phoneOrigin,
        extraParams.callerPhone,
        dialogConfig.weatherInfoSms
      );
    }

    voiceResp.say(dialogConfig.weatherInfoGreeting);

    const gather = voiceResp.gather({
      action: `${endpointPrefix}/${routes.ivr}`,
      numDigits: '1',
      method: 'POST'
    });

    gather.say('To go to the previous menu, press any key');
    return voiceResp.toString();
  }

  /**
   * Allow callers suggest activities.
   * @return {String} TwiML XML string
   */
  showActivitySuggestionsGreeting(extraParams) {
    const voiceResp = new VoiceResponse();

    const gather = voiceResp.gather({
      action: `${endpointPrefix}/${routes.ivrSuggestions}`,
      numDigits: '1',
      method: 'POST'
    });

    gather.say(dialogConfig.suggestionsGreeting);

    return voiceResp.toString();
  }

  /**
   * Allow callers suggest activities for different areas.
   * @param {String} menuItem
   * @param  {Object} extraParams - Request parameters object
   * @return {String} TwiML XML string
   */
  navigateActivitySuggestions(menuItem, extraParams) {
    menuItem = parseInt(menuItem);

    const optionsHandlers = {
      '1': this.handleTransportationSuggestions,
      '2': this.handleReservationSuggestions,
      '3': this.handleExcursionSuggestions
    };

    return menuItem in optionsHandlers
      ? optionsHandlers[menuItem](extraParams)
      : this.showActivitySuggestionsGreeting();
  }

  /**
   * Handles transportation suggestions
   * @return {String} TwiML Xml
   */
  handleTransportationSuggestions() {
    const voiceResp = new VoiceResponse();
    const gather = voiceResp.gather({
      action: `${endpointPrefix}/${routes.ivrSuggestionsTransportation}`,
      numDigits: '1',
      method: 'POST'
    });

    gather.say(dialogConfig.transportSuggestionsPrompt);

    return voiceResp.toString();
  }

  /**
   * Chooses the appropriate action to execute.
   * @param  {String} menuItem action id
   * @return {String}          TwiMl response
   */
  manageTransportationSuggestionsPrompts(menuItem) {
    menuItem = parseInt(menuItem);

    if (menuItem >= 3) {
      return this.handleTransportationSuggestions();
    }
    const voiceResp = new VoiceResponse();

    if (menuItem === 1) {
      voiceResp.say(`We are connecting you to our customer service helpline`);
      voiceResp.dial(dialogConfig.assistanceHelpline);
    } else {
      // Record the message
      voiceResp.say(
        `Please leave a message containing your details after the beep - you can end the message by pressing any button.`
      );
      voiceResp.record({
        maxLength: 120,
        action: `${endpointPrefix}/${routes.ivrMessagesTransportation}`,
        transcribe: true
      });
      voiceResp.say(`Our support experts will be in touch with you shortly!`);
    }

    return voiceResp.toString();
  }

  /**
   * Allow callers get the weather report link.
   * @param  {Object} extraParams - Request parameters object
   * @return {String} TwiML XML string
   */
  handleReservationSuggestions(extraParams) {
    const voiceResp = new VoiceResponse();

    if ('callerPhone' in extraParams && extraParams.callerPhone) {
      TwilioService.sendTextMessage(
        phoneOrigin,
        extraParams.callerPhone,
        dialogConfig.reservationInfoSms
      );
    }

    voiceResp.say(dialogConfig.reservationInfoGreeting);

    const gather = voiceResp.gather({
      action: `${endpointPrefix}/${routes.ivrSuggestions}`,
      numDigits: '1',
      method: 'POST'
    });

    gather.say('To go to the previous menu, press any key');
    return voiceResp.toString();
  }

  /**
   * Handles excursions suggestions
   * @return {String} TwiML Xml
   */
  handleExcursionSuggestions() {
    const voiceResp = new VoiceResponse();
    const gather = voiceResp.gather({
      action: `${endpointPrefix}/${routes.ivrSuggestionsExcursions}`,
      numDigits: '1',
      method: 'POST'
    });

    gather.say(dialogConfig.excursionSuggestionsPrompt);

    return voiceResp.toString();
  }

  /**
   * Chooses the appropriate action to execute.
   * @param  {String} menuItem action id
   * @param  {Object} extraParams Request params
   * @return {String}          TwiMl response
   */
  manageExcursionSuggestionsPrompts(menuItem, extraParams) {
    menuItem = parseInt(menuItem);

    if (menuItem >= 3) {
      return this.handleExcursionSuggestions();
    }

    const voiceResp = new VoiceResponse();

    if (menuItem === 2) {
      voiceResp.say(`We are connecting you to our customer service helpline`);
      voiceResp.dial(dialogConfig.assistanceHelpline);
      // Send a message
    } else {
      voiceResp.say(
        `We have sent an SMS containing helpful info to your phone.`
      );

      if ('callerPhone' in extraParams && extraParams.callerPhone) {
        TwilioService.sendTextMessage(
          phoneOrigin,
          extraParams.callerPhone,
          dialogConfig.excursionsInfoSms
        );
      }
    }

    return voiceResp.toString();
  }

  /**
   * Shows assistance info.
   * @param  {Object} extraParams - Request parameters object
   * @return {String} Assistance info
   */
  showAssistanceInfo(extraParams) {
    const voiceResp = new VoiceResponse();

    const gather = voiceResp.gather({
      action: `${endpointPrefix}/${routes.ivrAssistance}`,
      numDigits: '1',
      method: 'POST'
    });

    gather.say(dialogConfig.assistanceGreeting);

    return voiceResp.toString();
  }

  /**
   * Handles assistance information requests.
   * @param {String} assistanceOption
   * @return {String} Assistance info
   */
  handleAssistanceInfoRequest(assistanceOption) {
    assistanceOption = parseInt(assistanceOption);

    const options = {
      '1': this.handleUrgentAssistanceRequest,
      '2': this.handleNonUrgentAssistanceRequest
    };

    return assistanceOption in options
      ? options[assistanceOption]()
      : this.showAssistanceInfo();
  }

  /**
   * Handles urgent assistance requests
   * @return {String} Returns a call
   */
  handleUrgentAssistanceRequest() {
    const voiceResp = new VoiceResponse();
    voiceResp.dial(dialogConfig.assistanceHelpline);

    return voiceResp.toString();
  }

  /**
   * Handles non-urgent assistance requests
   * @return {String}
   */
  handleNonUrgentAssistanceRequest() {
    const twimlResp = new VoiceResponse();

    // Record the caller address
    twimlResp.say(dialogConfig.nonUrgentAssistancePrompt);
    twimlResp.record({
      maxLength: 120,
      action: `${endpointPrefix}/${routes.ivrMessagesAssistanceAddress}`,
      transcribe: true
    });

    // Record the message
    twimlResp.say(`Got it! And what is the issue you're experiencing?`);
    twimlResp.record({
      maxLength: 120,
      action: `${endpointPrefix}/${routes.ivrMessagesAssistanceIssue}`,
      transcribe: true
    });
    twimlResp.say(`We'll contact the phone number on file as soon as possible`);

    return twimlResp.toString();
  }
}

module.exports = IvrRepository;
