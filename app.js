var express = require('express');
var app = express();


var port = process.argv[2];
var hook_every_branch = 'refs/heads/*'

console.log('Hook receiver is listening on port: ' +port+ ' and it\'s listening on branch: ' +process.argv[3]);

if(process.argv[3] == null){
	wanted_branch = 'refs/heads/*'
} else {
	wanted_branch = 'refs/heads/' + process.argv[3];
}

app.use(express.bodyParser());

app.post('/recipes', function(request, response){


	var right_body = give_back_when_right_branch(wanted_branch, request.body['ref']);

	console.log(right_body);

	if(right_body) {
		// git pull!!!
	}


	response.send(request.body);    // echo the result back
});

app.listen(port);

console.log('Listening on ' + port);





var give_back_when_right_branch = function(wanted_branch, hook_branch) {	
	if((wanted_branch == hook_branch) || (wanted_branch == hook_every_branch)){
		return true;
	} else {
		return false;
	}
}