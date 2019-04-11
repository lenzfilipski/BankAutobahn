var server = require('ws').Server;
var serv1 = new server({ port: 5001 });

serv1.on('connection', function(ws) {
  console.log('conected');
  ws.on('message', function(message_str) {
    console.log('Recieved: ' + message_str);
    var message = JSON.parse(message_str);

    switch (message.id) {
      case 'test':
        if (message.content == 'hello') {
          ws.send("{ 'id':'test', 'content':'hi from other world!'}");
        }
        else {
          ws.send(message);
        }
        break;
      default:
        ws.send(JSON.stringify(message));
    };
  });
});
