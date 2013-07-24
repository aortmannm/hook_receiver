var express = require('express');
var app = express();

var wanted_branch = process.argv[3];
var port = process.argv[2];

console.log('Hook receiver is listening on port: ' +port+ ' and it\'s listening on branch: ' +wanted_branch);

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
	if(wanted_branch == hook_branch){
		return true;
	} else {
		return false;
	}
}