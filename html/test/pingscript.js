// javascript du client / page web
// console.log(x) permet d'afficher x dans la console
// a.send(x) permet d'envoyer d'envoyer la chaine x avec la connection a

// Cree un lien websocket secure avec le serveur
// j'ai remplace le port par '/myws' et mis en place un reverse proxy sur le seveur
var sock = new WebSocket('wss://bank.filipski.fr/myws');

// Execute a l'ouverture de la connection avec le serveur ws
sock.onopen = function (event) {
  console.log('Connected!');
  sock.send('testHello world!');
};

// Gere la reception des messages du serveur ws
sock.onmessage = function (event) {
  console.log(event.data);

  // Permet de récupérer et de séparer l'ID et le contenu recu du serveur ws
  var message = event.data;
  var id = message.slice(0, 4);
  var content = message.slice(4);

  // Permet d'effectuer differentes actions en fonction de l'ID de la requette
  switch (id) {

    // si id == test
    case 'test':
      // affiche le contenu de content dans la balise <output id="enter1">
      document.getElementById('enter1').innerHTML = content;
      break;
  }
};
