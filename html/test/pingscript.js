// javascript du client / page web
// console.log(x) permet d'afficher x dans la console
// a.send(x) permet d'envoyer d'envoyer la chaine x avec la connection a

// Cree un lien websocket secure avec le serveur
var sock = new WebSocket('wss://bank.filipski.fr/myws');

// Execute a l'ouverture de la connection avec le serveur
sock.onopen = function (event) {
  console.log('Connected!');
  sock.send('testHello world!');
};

// Gere la réception des messages du serveur
sock.onmessage = function (event) {
  console.log(event.data);

  // Permet de récupérer et de séparer l'ID et le contenu recu du serveur
  var message = event.data;
  var id = message.slice(0, 4);
  var content = message.slice(4);

  // Permet d'effectuer differentes actions en fonction de l'ID de la requette
  switch (id) {
    case 'ping':
      switch (content) {
        case '__ping__':
          sock.send('ping__pong__')
          break;
        default:

      }
      break;

    //
    case 'test':
      document.getElementById('enter1').innerHTML = content;
      break;
  }
};
