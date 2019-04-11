var server = require('ws').Server;
var serv1 = new server({ port: 5001 });

serv1.on('connection', function(ws) {
  console.log('connected');
  ws.on('message', function(message_str) {
    var message = JSON.parse(message_str);
    console.log('Recieved: ' + message.id + ' || ' + message.content);

    switch (message.id) {
      case 'test':
        if (message.content == 'hello') {
          ws.send(JSON.stringify({ "id":"test", "content":"hi from other world!"}));
        }
        else {
          ws.send(message_str);
        }
        break;
      default:
        ws.send(JSON.stringify(message));
        break;
    };
  });
});
