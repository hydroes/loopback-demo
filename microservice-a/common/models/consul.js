'use strict'

const consul = require('consul')({
  promisify: true
})

module.exports = function (Consul) {
  Consul.status = cb => {
    let timestamp = new Date().getTime()
    cb(null, timestamp)
  }
  Consul.remoteMethod('status', {
    http: {
      path: '/healthcheck',
      verb: 'get'
    },
    returns: {
      arg: 'status',
      type: 'int'
    }
  })
  Consul.services = async () => {
    let catalog = []

    // get available services
    let services = await consul.catalog.service.list()
    let servicesList = Object.keys(services)

    // get nodes on each service:
    for (let i in servicesList) {
      let nodes = await consul.catalog.service.nodes(servicesList[i])
      // build service catalog info
      let serviceData = {
        serviceName: servicesList[i],
        nodes: nodes
      }
      catalog.push(serviceData)
    }

    return catalog
  }
  Consul.remoteMethod('services', {
    http: {
      path: '/services',
      accepts: { arg: 'serviceName' },
      verb: 'get'
    },
    returns: {
      arg: 'test',
      type: 'json'
    }
  })
}
