'use strict';

module.exports = function(Consul) {
  Consul.status = function(cb) {
    var date = new Date()
    var response = date.getTime()
    cb(null, response);
  };
  Consul.remoteMethod(
    'status', {
      http: {
        path: '/healthcheck',
        verb: 'get'
      },
      returns: {
        arg: 'status',
        type: 'int'
      }
    }
  );
};
