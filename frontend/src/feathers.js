const feathers = require('@feathersjs/feathers')
const rest = require('@feathersjs/rest-client')
const authentication = require('@feathersjs/authentication-client')

const app = feathers()
const restClient = rest('http://localhost:3030')

app.configure(authentication({
  storageKey: 'auth'
}))

app.configure(restClient.fetch(window.fetch.bind(window)))

const todos = app.service('todos')

export { app as feathers, todos }
