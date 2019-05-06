var sock = new WebSocket('ws://localhost:5001');
sock.onopen = function (event) {
  // Create a random session ID
  console.log('Connected!');
  // sock.send('{ "id":"test", "content":"Hello world!"}');
};
sock.onmessage = function (event) {
  console.log(event.data);
  var message = event.data;
  var id = message.slice(0, 4);
  var content = message.slice(4);

  switch (id) {
    case 'hggn':
      // sock.send('{ "id":"ping", "content":"1" }')
      break;
    case 'test':
      document.getElementById('enter1').innerHTML = content;
      break;
  }
};
