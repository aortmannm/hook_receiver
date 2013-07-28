var express = require('express');
var app = express();
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');

var counter = 0;
var port = process.argv[2];
var hookOnAllBranches = 'refs/heads/*'
var command = '';
var config = '';
var configFound = '';

if(process.argv[3] == null){
	chosenBranch = 'refs/heads/*'
} else {
	chosenBranch = 'refs/heads/' + process.argv[3];
}

var configPath = __dirname  +'/config/';
var availableConfigFiles = fs.readdirSync(configPath);

console.log('Hook receiver is listening on port: ' +port+ ' and it\'s listening on branch: ' +chosenBranch);

app.use(express.bodyParser());
app.post('*', function(request, response){

	configFound = false;
	if(checkIfJsonFileExists(request)){
		var rightBranch = checkIfItsCorrectBranch(chosenBranch, request.body['ref']);
	 	
		var cb = function(){
			if(counter < config.commands.length){
				tasksToProgress(config.commands[counter], cb)
			} else {
				counter = 0;
			}
		}

		if(rightBranch && JSON.parse(JSON.stringify(request.body))) {
			tasksToProgress(config.commands[counter], cb);
		}

	} else {
		console.log('You got a hook but have no config file for it. Pls create a .json in the /config folder like the sample.json');
		request.connection.destroy();
	}
	
	response.send(request.body);    // echo the result back
});

app.listen(port);

var checkIfItsCorrectBranch = function(chosenBranch, hookBranch) {	
	if((chosenBranch == hookBranch) || (chosenBranch == hookOnAllBranches)){
		return true;
	} else {
		return false;
	}
}

var tasksToProgress = function(command, cb) {
	counter++;
	var child;
	child = exec(command, function (error, stdout, stderr) {
	console.log('stdout:\n' + stdout);
	console.error('stderr:\n' + stderr);
	if (error !== null) {
    	console.error('exec error: ' + error);
	}
	cb();
});
}

var checkIfJsonFileExists = function(request) {
	for (var i = 0; i < availableConfigFiles.length; i++) {
		if(request.method == 'POST' && request.url.slice(1) == availableConfigFiles[i].split(".")[0]) {

			config = path.join(configPath + availableConfigFiles[i]);
			config = require(config);
			
			configFound = true;
		}
	}
	return configFound;
}