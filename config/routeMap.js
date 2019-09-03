'use strict'

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Routes Map
  |--------------------------------------------------------------------------
  |
  | Define all routes here.
  |
  */
  routes: {
    ivr: 'ivr',
    ivrMenu: 'menu',
    ivrSuggestions: 'suggestions',
    ivrSuggestionsTransportation: 'transportation',
    ivrSuggestionsExcursions: 'excursions',
    ivrMessagesTransportation: 'messages/transportation',
    ivrMessagesAssistanceAddress: 'messages/assistance/address',
    ivrMessagesAssistanceIssue: 'messages/assistance/issue',
    ivrAssistance: 'api/v1/ivr/assistance',

    sms: 'api/v1/sms',
  }
}
