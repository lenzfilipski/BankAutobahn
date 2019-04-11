var sock = new WebSocket('ws://bank.filipski.fr:5001');
sock.onopen = function (event) {
  console.log('Connected!');
  sock.send('{ "test":"text", "content":"Hello world!"}');
};
sock.onmessage = function (event) {
  console.log(event.data);
  var in_mess = JSON.parse(event.data);

  switch (message.id) {
    case 'ping':
      sock.send('{ "id":"ping", "content":"1" }')
      break;
    case 'test':
      document.getElementById('enter1').innerHTML = in_mess.content;
      break;
  }
};
