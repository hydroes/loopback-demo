'use strict'

const pkg = require('./../../package.json')
const config = require('./../config.json')
const consul = require('consul')({
  promisify: true
})

module.exports = (app, cb) => {
  // skip ms registration if configured to do so
  if (config.serviceDiscovery.registerService === false) {
    process.nextTick(cb)
    return
  }

  // build registration info
  // @todo: options.address options.check.http need to be smarter
  let options = {
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

  // register microservice
  consul.agent.service.register(options)
  process.nextTick(cb)
}
