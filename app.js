var express = require('express');
var app = express();



var wanted_branch = 'refs/heads/' + 'master';


if(process.argv[2]){
	var port = process.argv[2];
} else {
	port = 8001
}


app.use(express.bodyParser());

app.post('/recipes', function(request, response){
 
	var right_body = give_back_when_right_branch(wanted_branch, request.body['ref']);

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