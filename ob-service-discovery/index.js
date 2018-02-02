'use strict'

const consul = require('consul')({
  promisify: true
})

class ConsulAdapter {
  defaults = {
    test: 'blad'
  }
  constructor(options) {
    let consulOpts = Object.assign(
      {
        name,
        id,
        tags,
        address,
        port,
        check: {
          http,
          interval,
          timeout
        }
      },
      options
    )
  }
}

const CONSUL_SERVICE = 'CONSUL_SERVICE'

class ServiceDiscovery {
  constructor(Adapter) {
    this.Adapter = Adapter
  }
  register() {
    this.Adapter.register()
    return {
      status: 'success'
    }
  }
  list() {
    this.Adapter.list()
    return []
  }
}

let defaults = {
  name: 'def name',
  age: 33
}

let settings = {
  name: 'brian',
  something: 'else'
}

let final = Object.assign({}, defaults, settings)
console.log('final', final)

// let t = new ConsulAdapter()
// let name = 'my name'

// let map = { name }
// console.log('map', map)

// module.exports = () => {
//   console.log('test2')
// }
