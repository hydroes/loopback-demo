'use strict';

let pkg = require('./../../package.json')
let config = require('./../config.json')

module.exports = function(app, cb) {
  /*
   * The `app` object provides access to a variety of LoopBack resources such as
   * models (e.g. `app.models.YourModelName`) or data sources (e.g.
   * `app.datasources.YourDataSource`). See
   * http://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects
   * for more info.
   */

   // @todo register the ms name, ip, port and ms health check.
   console.log('boot config', config.host, config.port)


  process.nextTick(cb); // Remove if you pass `cb` to an async function yourself
};
