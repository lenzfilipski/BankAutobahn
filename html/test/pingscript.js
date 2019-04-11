var sock = new WebSocket('ws://bank.filipski.fr:5001');
sock.onopen = function (event) {
  // Create a random session ID
  console.log('Connected!');
  sock.send('{ "id":"test", "content":"Hello world!"}');
};
sock.onmessage = function (event) {
  console.log(event.data);
  var message = JSON.parse(event.data);

  switch (message.id) {
    case 'ping':
      sock.send('{ "id":"ping", "content":"1" }')
      break;
    case 'test':
      document.getElementById('enter1').innerHTML = message.content;
      break;
  }
};
