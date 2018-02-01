'use strict'

module.exports = function (Consul) {
  Consul.status = cb => {
    var date = new Date()
    var response = date.getTime()
    cb(null, response)
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
  Consul.test = cb => {
    // get service through rest datasource
    // let services = Consul.services()
    // services
    //   .then(response => {
    //     cb(null, response)
    //   })
    //   .catch(error => {
    //     cb(null, error)
    //   })
  }
  Consul.remoteMethod('services', {
    http: {
      path: '/services',
      accepts: { arg: 'serviceName' },
      verb: 'get'
    },
    returns: {
      arg: 'test',
      type: 'string'
    }
  })
}
