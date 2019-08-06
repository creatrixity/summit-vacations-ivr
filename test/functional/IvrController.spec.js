'use strict';

const { ioc } = use('@adonisjs/fold')

const { test, trait } = use('Test/Suite')('IvrController');
const Config = use('Config')
const dialogConfig = Config.get('dialog');
const { phoneOrigin } = Config.get('twilio');
const { routes } = Config.get('routeMap')

trait('Test/ApiClient');

test('should return a TwiML string welcome greeting', async ({ client, assert }) => {
  let response = await client
    .post(routes.ivr)
    .end();

  assert.include(response.text, 'Gather');
  assert.include(response.text, 'Say');
}).timeout(0)

test('should return arrival info greeting TwiML string', async ({ client, assert }) => {
  let response = await client
    .post(routes.ivrMenu)
    .send({ Digits: '1' })
    .end();

  assert.include(response.text, dialogConfig.arrivalInfoGreeting);
}).timeout(0)

test('should return weather info greeting TwiML string', async ({ client, assert }) => {
  ioc.fake('TwilioService', () => {
    return {
      async sendTextMessage() {}
    }
  })

  let response = await client
    .post(routes.ivrMenu)
    .send({ Digits: '2' })
    .end();

  assert.include(response.text, dialogConfig.weatherInfoGreeting);

  ioc.restore('TwilioService')
}).timeout(0)

test('should return suggestions greeting TwiML string', async ({ client, assert }) => {
  let response = await client
    .post(routes.ivrMenu)
    .send({ Digits: '3' })
    .end();

  assert.include(response.text, dialogConfig.suggestionsGreeting);
}).timeout(0)

test('should return assistance greeting TwiML string', async ({ client, assert }) => {
  let response = await client
    .post(routes.ivrMenu)
    .send({ Digits: '4' })
    .end();

  assert.include(response.text, dialogConfig.assistanceGreeting);
}).timeout(0)

test('should return transportation suggestions prompt TwiML string', async ({ client, assert }) => {
  let response = await client
    .post(routes.ivrSuggestions)
    .send({ Digits: '1' })
    .end();

  assert.include(response.text, dialogConfig.transportSuggestionsPrompt);
}).timeout(0)

test('should return excursion suggestions prompt TwiML string', async ({ client, assert }) => {
  let response = await client
    .post(routes.ivrSuggestions)
    .send({ Digits: '3' })
    .end();

  assert.include(response.text, dialogConfig.excursionSuggestionsPrompt);
}).timeout(0)

test('should connect a caller to the helpline to give transportation suggestions', async ({ client, assert }) => {
  let response = await client
    .post(routes.ivrSuggestionsTransportation)
    .send({ Digits: '1' })
    .end();

  assert.include(response.text, 'Dial');
  assert.include(response.text, dialogConfig.assistanceHelpline);
}).timeout(0)

test('should allow a caller record transportation suggestions', async ({ client, assert }) => {
  let response = await client
    .post(routes.ivrSuggestionsTransportation)
    .send({ Digits: '2' })
    .end();

  assert.include(response.text, 'Response');
  assert.include(response.text, 'Record');
}).timeout(0)

test('should allow callers connect to the helpline for an urgent assistance request', async ({ client, assert }) => {
  let response = await client
    .post(routes.ivrAssistance)
    .send({ Digits: '1' })
    .end();

  assert.include(response.text, 'Dial');
}).timeout(0)

test('should allow callers leave a message for a non-urgent assistance request', async ({ client, assert }) => {
  let response = await client
    .post(routes.ivrAssistance)
    .send({ Digits: '2' })
    .end();

  assert.include(response.text, dialogConfig.nonUrgentAssistancePrompt);
  assert.include(response.text, 'Record');
}).timeout(0)

test('successfully connects a caller to the helpline to give excursion suggestions', async ({ client, assert }) => {
  let response = await client
    .post(routes.ivrSuggestionsExcursions)
    .send({ Digits: '2' })
    .end();

  assert.include(response.text, 'Dial');
  assert.include(response.text, dialogConfig.assistanceHelpline);
}).timeout(0)
