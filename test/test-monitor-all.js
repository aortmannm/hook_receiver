'use strict';

var request = require('superagent');

var Receiver = require('../lib/receiver');
Receiver.start( 8789, __dirname+'/test-configs' );


request
  .post('http://localhost:8789/....')
  .send({ ref: 'refs/head/master' })
  .end(function(error, res){
    console.log('OK');
  });


//r.stop();

