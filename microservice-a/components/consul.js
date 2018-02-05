'use strict'

const consul = require('consul')({
  promisify: true
})

module.exports = (loopbackApplication, options) => {
  // allow loopback settings to be accessed from within consul methods
  let s = loopbackApplication.settings.serviceDiscovery

  // skip ms registration if configured to do so
  if (s.serviceDiscovery && s.serviceDiscovery.registerService === false) {
    return
  }

  // build config for service discovery
  let opts = {
    name: s.uniqueServiceName,
    id: s.uniqueServiceName,
    tags: s.tags || ['ob-microservices'],
    address: 'http://' + loopbackApplication.settings.host,
    port: loopbackApplication.settings.port,
    check: {
      http: s.healthcheckUrl,
      interval: s.interval,
      timeout: s.timeout,
      deregistercriticalserviceafter: s.deregistercriticalserviceafter
    }
  }

  // register microservice
  consul.agent.service.register(opts).catch(function (err) {
    let msg = 'An error occurred during service discovery registration: '
    msg += err.message
    throw new Error(msg)
  })
}
