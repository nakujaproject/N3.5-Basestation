let WebSocketServer = require('ws').Server;
let fs = require('fs');

let dir = `images/${((new Date()).getTime()).toString().slice(6)}`;
if (!fs.existsSync(dir)){
	fs.mkdirSync(dir);
}

let wss = new WebSocketServer({ port: 8081 });
let clients = []
let counter = 0;
console.log("server started");
wss.on('connection', function connection(ws) {
	console.log("new client: ",clients.length);

	clients.push(ws);
	ws.on('message', function incoming(message) {
		console.log('received image');
		counter++;
		fs.writeFile(`${dir}/${counter}.jpg`, message, {encoding: 'binary'}, function(err) {
			if (err) throw err;
		});
		clients.forEach((client) => {
			if (client !== ws)	client.send(message);
		});
	});
	ws.on('close', function close() {
		console.log('disconnected');
		clients = clients.filter((client) => client !== ws);
	});
});