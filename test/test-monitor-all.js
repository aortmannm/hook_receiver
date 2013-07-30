'use strict';

var request = require('superagent');

var Receiver = require('../lib/receiver');
Receiver.start( 8001, __dirname+'/test-configs/', 'master');


request
  .post('http://localhost:8001/sample')
  .send({ ref: 'refs/heads/master' })
  .end(function(error, res){
    console.log('OK');
  });


//r.stop();

