var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Router = require('./router.js');

var start = function() {

	var router = new Router();

	io.on('connection', function(socket){
		router.route(socket);
	});


	http.listen(3000, '127.0.0.1', function(){
		console.log('listening on *:3000');
	});
};

module.exports = {
	'start': start
};
