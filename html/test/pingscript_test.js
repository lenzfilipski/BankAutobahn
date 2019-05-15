// function that togle connection form and full site
function toggleSite() {
  if (connected == true) {

  }
  else {

  };
};

function sendConn() {
  var accId = document.getElementById['inputId'].value;
  var accPw = document.getElementById['inputPassword'].value;
  if (accId && accPw) {
    if (accId.length == 10) {
      var connToSend = 'conn' + accId + accPw;
      sock.send(connToSend);
      console.log(connToSend);
    }
    else {
      console.log("Id is too short");
    };
  };
};

function riiturn() {
  var accId = document.getElementById['inputId'].value;
  var accPw = document.getElementById['inputPassword'].value;
  var toAjax = 'inputs=' + accId + accPw;
  $.ajax({
    type:"post",
    url:"riiturn.php",
    data:toAjax,
    cache:false,
    success: function(html) {
      $('#msg').html(html);
    }
  });
  return false;
}




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
    case 'conn':
      if (content == '1') { connected = true; }
      else { connected = false; };
      toggleSite();

      break;
  }
};
