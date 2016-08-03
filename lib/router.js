
var Router = function() {

	this.availableDevices = {};

};

Router.prototype.route = function(socket) {
	var that = this;
	socket.on('register', function(data){
		that.availableDevices[data.id] = socket;
		that.availableDevices[data.id].emit('controlMsg', {devId: data.id, command: 'print', params: {msg: 'Welcome'}});
		console.log('Device registered: ' + data.id);
	});

	socket.on('controlMsg', function(data) {
		that.availableDevices[data.devId].emit('controlMsg', data);
	});
};

module.exports = Router;
