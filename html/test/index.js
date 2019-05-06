var server = require('ws').Server;
var serv1 = new server({ port: 5001 });

serv1.on('connection', function(ws) {
  console.log('connected');
  ws.on('message', function(message_str) {
    var message = message_str;
    var id = message.slice(0, 4);
    var content = message.slice(4);
    console.log('Recieved: ' + id + ' || ' + content);

    switch (id) {
      case 'test':
        if (content == 'hello') {
          ws.send('testhi from other world');
        }
        else {
          ws.send(message);
        };
        break;
      default:
        ws.send(message);
        break;
    };
  });
});
