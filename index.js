var path = require('path');
var receiver = require('./lib/receiver.js');

var program = require('commander');

program
  .version('0.0.1')
  .option('-p, --port', 'specify port')
  .parse(process.argv);

console.log(program.port);

var port = program.port;

var configs = path.join(process.cwd(), 'config');
receiver.start(port,configs);