var http = require('http'),
	fs = require('fs');

//Create a simple HTTP server
var server = http.createServer(function(request, response) {
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write("<h1>Hello!</h1><p>You asked for <code>" + request.url + "</code></p>");
	response.end();
});
server.listen(1337); //set a listening port

// Read a file
fs.readFile('something.txt', 'utf8', function(error, text) {
	if (error) {
		throw error;
	}
	console.log('The file contains:', text); //logs last
});

//Write a file
fs.writeFile('something.txt', 'Node was here', function(error) {
	if (error) {
		console.log('Failed to write file:', error);
	} else {
		console.log('File written.'); //logs second
	}
});

console.log('Server running at http://localhost:1337/'); //logs first