var path = require('path');
var receiver = require('./lib/receiver.js');

var program = require('commander');

program
  .version('0.0.1')
  .option('-p, --port <port>', 'specify port')
  .parse(process.argv);

var port = program.port;

if(typeof(port) === 'undefined')
  port = 8001;

var configs = path.join(process.cwd(), 'config');
receiver.start(port,configs);