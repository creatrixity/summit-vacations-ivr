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
    ivr: '/api/v1/ivr',
    ivrMenu: '/api/v1/ivr/menu',
    ivrSuggestions: '/api/v1/ivr/suggestions',
    ivrSuggestionsTransportation: '/api/v1/ivr/suggestions/transportation',
    ivrSuggestionsExcursions: '/api/v1/ivr/suggestions/excursions',
    ivrMessagesTransportation: '/messages/transportation',
    ivrMessagesAssistanceAddress: '/messages/assistance/address',
    ivrMessagesAssistanceIssue: '/messages/assistance/issue',
    ivrAssistance: '/api/v1/ivr/assistance',

    sms: '/api/v1/sms',
  }
}
