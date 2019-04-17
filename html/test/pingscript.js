var sock = new WebSocket('ws://lenz.filipski.fr:5001');
sock.onopen = function (event) {
  // Create a random session ID
  console.log('Connected!');
  sock.send('testHello world!');
};
sock.onmessage = function (event) {
  console.log(event.data);
  var message = event.data;
  var id = message.slice(0, 4);
  var content = message.slice(4);

  switch (id) {
    case 'ping':
      switch (content) {
        case '__ping__':
          sock.send('ping__pong__')
          break;
        default:

      }
      break;
    case 'test':
      document.getElementById('enter1').innerHTML = content;
      break;
  }
};
