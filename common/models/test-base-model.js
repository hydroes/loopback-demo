'use strict';

module.exports = function(Testbasemodel) {

  console.log('Testbasemodel', Testbasemodel)

  Testbasemodel.status = function(cb) {
    var date = new Date()
    console.log('Current time is %s', date.toString());
    var response = date.getTime()
    cb(null, response);
  };
  Testbasemodel.remoteMethod(
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
