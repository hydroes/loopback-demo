'use strict'

let pkg = require('./../../package.json')
let config = require('./../config.json')
let consul = require('consul')({
  promisify: true
})

module.exports = function (app, cb) {
  // skip ms registration if configured to do so
  if (config.serviceDiscovery.registerService === false) {
    process.nextTick(cb)
    return
  }

  // build registeration info
  // @todo: options.address options.check.http need to be smarter
  var options = {
    name: pkg.name,
    id: pkg.name,
    tags: ['ob-microservice'],
    address: 'http://' + config.host,
    port: config.port,
    check: {
      http: config.serviceDiscovery.healthcheckUrl,
      interval: config.serviceDiscovery.interval,
      timeout: config.serviceDiscovery.timeout
    }
  }
  console.log('options', options.check.http)
  // register microservice
  var consulService = consul.agent.service.register(options)
  consulService
    .catch(error => {
      console.error('consulService: ', error.message)
    })
    .then(() => {
      process.nextTick(cb)
    })
}
