// WSS init from https://blog.zackad.com/en/2017/08/19/create-websocket-with-nodejs.html
// Minimal amount of secure websocket server
var fs = require('fs');
// read ssl certificate
var privateKey = fs.readFileSync('cert/privkey.pem', 'utf8');
var certificate = fs.readFileSync('cert/fullchain.pem', 'utf8');
var credentials = { key: privateKey, cert: certificate };
var https = require('https');
//pass in your credentials to create an https server
var httpsServer = https.createServer(credentials);
httpsServer.listen(5001);


var server = require('ws').Server;
var serv1 = new server({ server: httpsServer });

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
