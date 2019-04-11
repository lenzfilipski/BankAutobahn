var server = require('ws').Server;
var serv1 = new server({ port: 5001 });

serv1.on('connection', function(ws) {
  ws.on('message', function(message_str) {
    console.log('Recieved: ' + message_str);
    var message = JSON.parse(message_str);

    switch (message.type) {
      case 'text':
        switch (message.content) {
          case 'hello':
            ws.send("{ 'type':'text', 'content':'hi from other world!'}");
            break;
        }
      default:
        ws.send(JSON.stringify(message));
    }

    if (message == 'hello') {
      ws.send('hi from other world!')
    }
    else {
      ws.send(message)
    }
  });
});
