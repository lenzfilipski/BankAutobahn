var sock = new WebSocket('ws://bank.filipski.fr:5001');
sock.onopen = function (event) {
  alert('Connected!')
  setTimeout(function() {
    sock.send('Hello World!')
  }, 1000);
};
sock.onmessage = function (event) {
  console.log(event.data);
  document.getElementById('enter1').innerHTML = event.data
};
