var express = require('express');
var fs = require('fs');
var url = require('url');
var request_file;

var app = express.createServer(express.logger());

app.get('/*',function(request, response) {
	if(!request.params[0])
	{
		request_file = "index.html";
	}
	else
	{
		request_file = request.params[0];
	}

	if(request.url.indexOf('.css') != -1)
	{
		response.header('Content-Type', 'text/css');
	}
	else if(request.url.indexOf('.js') != -1)
	{
		response.header('Content-Type', 'text/javascript');
	}
	else
	{
		response.header('Content-Type', 'text/html');
	}

	var html = fs.readFileSync(request_file).toString();
	response.send(html);
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
	console.log("Listening on " + port);
});