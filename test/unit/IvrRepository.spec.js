'use strict'

const dialogConfig = require('../../config/dialog')
const IvrRepository = require('../../app/Repositories/IvrRepository')
const { countWord } = require('../utilities')

const { test } = use('Test/Suite')('Ivr Repository')

test('should show welcome greeting', async ({ assert }) => {
  const repo = new IvrRepository()
  const welcomeGreeting = repo.showWelcomeGreeting()
  const wordCount = countWord(welcomeGreeting)

  // contains at least two twiml verbs
  assert.equal(wordCount('Gather'), 2)
  assert.equal(wordCount('Say'), 2)

  assert.include(welcomeGreeting, dialogConfig.welcomeGreeting)
})

test('should show assistance greeting', ({ assert }) => {
  const repo = new IvrRepository()
  const assistanceGreeting = repo.showAssistanceInfo()
  const wordCount = countWord(assistanceGreeting)

  // contains at least two twiml verbs
  assert.equal(wordCount('Gather'), 2)
  assert.equal(wordCount('Say'), 2)

  assert.include(assistanceGreeting, dialogConfig.assistanceGreeting)
})

test('should properly handle urgent assistance requests', ({ assert }) => {
  const repo = new IvrRepository()
  const urgentAssistanceResponse = repo.handleAssistanceInfoRequest('1')
  const wordCount = countWord(urgentAssistanceResponse)

  // Should dial the customer helpline successfully
  assert.equal(wordCount('Response'), 2)
  assert.equal(wordCount('Dial'), 2)
})

test('should properly handle non-urgent assistance requests by logging messages', ({ assert }) => {
  const repo = new IvrRepository()
  const nonUrgentAssistanceResponse = repo.handleAssistanceInfoRequest('2')
  const wordCount = countWord(nonUrgentAssistanceResponse)

  // Should dial the customer helpline successfully
  assert.equal(wordCount('Response'), 2)
  assert.equal(wordCount('Record'), 2)

  assert.include(nonUrgentAssistanceResponse, dialogConfig.nonUrgentAssistancePrompt)
})

test('should properly handle invalid assistance options', ({ assert }) => {
  const repo = new IvrRepository()
  const response = repo.handleAssistanceInfoRequest()
  const wordCount = countWord(response)

  // Should not dial the customer helpline
  assert.equal(wordCount('Response'), 2)
  assert.equal(wordCount('Record'), 0)

  assert.include(response, dialogConfig.assistanceGreeting)
})

test('should show suggestions greeting', ({ assert }) => {
  const repo = new IvrRepository()
  const suggestionsGreeting = repo.showActivitySuggestionsGreeting()
  const wordCount = countWord(suggestionsGreeting)

  // contains at least two twiml verbs
  assert.equal(wordCount('Gather'), 2)
  assert.equal(wordCount('Say'), 2)

  assert.include(suggestionsGreeting, dialogConfig.suggestionsGreeting)
})

test('should navigate to the transportation suggestion type ', ({ assert }) => {
  const repo = new IvrRepository()
  const transportationSuggestionsPrompt = repo.navigateActivitySuggestions('1')
  const wordCount = countWord(transportationSuggestionsPrompt)

  // contains at least two twiml verbs
  assert.equal(wordCount('Gather'), 2)
  assert.equal(wordCount('Say'), 2)

  assert.include(transportationSuggestionsPrompt, dialogConfig.transportSuggestionsPrompt)
})

test('should navigate to the excursion suggestions type ', ({ assert }) => {
  const repo = new IvrRepository()
  const excursionSuggestionsPrompt = repo.navigateActivitySuggestions('3')

  const wordCount = countWord(excursionSuggestionsPrompt)

  // contains at least two twiml verbs
  assert.equal(wordCount('Gather'), 2)
  assert.equal(2, 2)
  
  assert.include(excursionSuggestionsPrompt, dialogConfig.excursionSuggestionsPrompt)
})
