'use strict'

const Config = use('Config')
const { routes } = Config.get('routeMap')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.post(routes.ivr, 'IvrController.postWelcome')
Route.post(routes.ivrMenu, 'IvrController.postMenu')
Route.post(routes.ivrSuggestions, 'IvrController.postActivitySuggestions')
Route.post(routes.ivrSuggestionsTransportation, 'IvrController.postTransportationSuggestions')
Route.post(routes.ivrSuggestionsExcursions, 'IvrController.postExcursionSuggestions')
Route.post(routes.ivrAssistance, 'IvrController.postAssistance')

Route.post(routes.sms, 'SMSController.postProcessResponse')
