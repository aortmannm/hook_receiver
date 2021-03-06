'use strict';

var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');

var express = require('express');

module.exports =  {
	start: startHookReceiver
};

function startHookReceiver(port, configsDirectory) {


	console.log('Hook receiver is listening on port: ' +port);

	var app = express();
	app.use(express.bodyParser());

	app.post('*', function(request, response){

		var config = loadConfigForRequest(configsDirectory, request);
		if(config){
			
		  if(!request.body) {
				return response.send(400);
		  }

		  var monitoredBranchName = getSelectedBranchFromConfig(config);
		  
			if(!isRequestAboutBranch(request, monitoredBranchName)){
				console.log('Ignoring POST for branch:' + getGitReferenceFromRequest(request));
				return response.send(200);
			}
			
			executeAllCommandsInConfig(config, function(){
				response.send(request.body);    // echo the result back
			});
			response.send(request.body);

		} else {
			console.log('You got a hook but have no config file for it. Pls create a .json in the /config folder like the sample.json');
			response.send(200);
		}
		
	});

	app.listen(port);

	return {
		stop: function(){
			app.close();
		}
	};
}

function executeAllCommandsInConfig(config, indexOfLastCommand, cb){

	if(typeof(indexOfLastCommand) === 'function'){
		cb = indexOfLastCommand;
		indexOfLastCommand = -1;
	}

	var currentCommandIndex = indexOfLastCommand + 1;
	
	if(currentCommandIndex >= config.commands.length)
		return;

	executeCommandInConfig(config, currentCommandIndex, function(){
		//if(err) return cb(err);
		var nextCommandIndex = currentCommandIndex;
		executeAllCommandsInConfig(config, nextCommandIndex, cb);
	});
}

function getSelectedBranchFromConfig(config){
	return config.branch[0];
}

function executeCommandInConfig(config, commandIndex, cb){

	var command = config.commands[commandIndex];

	exec(command, function (error, stdout, stderr) {
		console.log('stdout:\n' + stdout);
		console.error('stderr:\n' + stderr);
		if (error !== null) {
	    console.error('exec error: ' + error);
		}
		cb(error);
	});
}

function getGitReferenceFromRequest(request){
	return request.body.ref;
}

function isRequestAboutBranch(request, branchName) {
	
	var requestGitReference = getGitReferenceFromRequest(request);

	if(requestGitReference === branchName){
		return true;
	}

	if(branchName === buildGitRefForAllBranches()){
		return true;
	}

	return false;
}

function loadConfigForRequest(configsDirectory, request) {

	if(request.method !== 'POST')
		return null;

	var availableConfigFiles = fs.readdirSync(configsDirectory);
	for (var i = 0; i < availableConfigFiles.length; i++) {
		var configFileName = availableConfigFiles[i];
	  if( request.url.slice(1) === configFileName.split('.')[0] ) {
			var fullPath = path.join(configsDirectory, configFileName);
			return require(fullPath);
		}
	}
	
	return null;
}

function buildGitRefForAllBranches(){
	return buildGitRefForBranch('*');
}

function buildGitRefForBranch( branchName ) {
	return 'refs/heads/' + branchName;
}