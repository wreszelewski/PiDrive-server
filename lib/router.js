
var Router = function() {

	this.availableDevices = {};

};

Router.prototype.route = function(socket) {
	var that = this;
	socket.on('register', function(data){
		that.availableDevices[data.devId] = socket;
		that.availableDevices[data.devId].emit('controlMsg', {devId: data.devId, command: 'print', params: {msg: 'Welcome'}});
		console.log('Device registered: ' + data.id);
	});

	socket.on('controlMsg', function(data) {
		if(that.availableDevices[data.devId]) {
			that.availableDevices[data.devId].emit('controlMsg', data);
		} else {
			console.log(data);
		}
	});
};

module.exports = Router;
