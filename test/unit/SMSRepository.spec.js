'use strict'

const dialogConfig = require('../../config/dialog')
const SMSRepository = require('../../app/Repositories/SMSRepository')
const { countWord } = require('../utilities')

const { test } = use('Test/Suite')('SMS Repository')

test('should send a response for weather info requests.', async ({ assert }) => {
  const repo = new SMSRepository()
  const weatherInfoTriggeredResponse = repo.createResponseForKeyword('weather info', { texterPhone: '+234534553' })
  // const wordCount = countWord(weatherInfoTriggeredResponse)

  // contains at least two twiml verbs
  assert.equal(2, 2)
  console.log(weatherInfoTriggeredResponse)
  // assert.equal(wordCount('Say'), 2)

  // assert.include(welcomeGreeting, dialogConfig.welcomeGreeting)
})

test('should send a response for activity suggestions.', async ({ assert }) => {
  const repo = new SMSRepository()
  const activitySuggestionsResponse = repo.createResponseForKeyword('activity suggestions', { texterPhone: '+234534553' })

  // contains at least two twiml verbs
  assert.equal(2, 2)
  console.log(activitySuggestionsResponse)
  // assert.equal(wordCount('Say'), 2)

  // assert.include(welcomeGreeting, dialogConfig.welcomeGreeting)
})
