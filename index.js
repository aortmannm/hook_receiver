var path = require('path');
var receiver = require('./lib/receiver.js');

var port = process.argv[2];

var monitoredBranchName = '*';
if(process.argv[3]){
  monitoredBranchName = process.argv[3];
}


var configs = path.join(process.cwd(), 'config');
receiver.start(port,configs,monitoredBranchName);