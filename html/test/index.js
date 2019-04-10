var server = require('ws').Server;
var serv1 = new server({ port: 5001 });

serv1.on('connection', function(ws) {
  ws.on('message', function(message) {
    console.log('Recieved: ' + message);

    if (message == 'hello') {
      ws.send('hi from other world!')
    }
    else {
      ws.send(message)
    }
  });
});
