var express = require('express');
var app = express();
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');

var counter = 0;
var port = process.argv[2];
var hookOnAllBranches = 'refs/heads/*'
var command = '';

if(process.argv[3] == null){
	chosenBranch = 'refs/heads/*'
} else {
	chosenBranch = 'refs/heads/' + process.argv[3];
}

var configFile = fs.readdirSync(process.cwd() + '/config');
configFile = path.join(process.cwd() +'/config/' + configFile);
var config = require(configFile);


console.log('Hook receiver is listening on port: ' +port+ ' and it\'s listening on branch: ' +process.argv[3]);

var cb = function(){
	if(counter < config.tasks.length){
		tasksToProgress(config.tasks[counter], cb)
	}
}




app.use(express.bodyParser());

app.post('/recipes', function(request, response){

	var rightBranch = checkIfItsCorrectBranch(chosenBranch, request.body['ref']);

	
 	


	

	if(rightBranch && JSON.parse(JSON.stringify(request.body))) {
		tasksToProgress(config.tasks[counter], cb);
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
	child.
	cb();
});
}


