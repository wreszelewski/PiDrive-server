var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Router = require('./router.js');
var path = require('path');

var start = function() {

	app.get('/', function(req, res) {
		res.sendFile(path.resolve(__dirname + '/../templates/index.html'));
	});

	var router = new Router();
	
	io.on('connection', function(socket){
		router.route(socket);
	});


	http.listen(3000, '0.0.0.0', function(){
		console.log('listening on *:3000');
	});
};

module.exports = {
	'start': start
};
