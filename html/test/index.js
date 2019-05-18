// javascript execute par le serveur
// console.log(x) permet d'afficher x dans la console


// importe la bibliotheque websocket (ws) et cree un serveur qui ecoute le port 5001
var server = require('ws').Server;
var serv1 = new server({ port: 5001 });

var mysql = require('mysql');
var bd_conn = mysql.createConnection({
  host: 'localhost',
  user: 'bankroot',
  password: 'qw7Z$yVC',
  database: 'bank',
});


// Gere la connection des clients
serv1.on('connection', function(ws) {
  console.log('connected');

  // Gere la reception des messages du client
  ws.on('message', function(message_str) {

    // Permet de récupérer et de séparer l'ID et le contenu recu du client
    var message = message_str;
    var id = message.slice(0, 4);
    var content = message.slice(4);
    // affiche de facon formatee id et content dans la console du serveur
    console.log('Recieved: ' + id + ' || ' + content);

    // Permet d'effectuer differentes actions en fonction de l'ID de la requette
    switch (id) {
      case 'conn':
        if (content == '123456789012345') {
          ws.send('coreok')
        } else {
          ws.send('coreno')
        };
        //var acc_id = mysqql.escape(content.slice(0, 10));
        //var acc_pw = content.slice(10);
        //db_conn.query("SELECT pw FROM bk_users WHERE acc_id = ?", [acc_id], function (err, results) );
        break;

      // si id == test
      case 'test':
        if (content == 'hello') {
          // evoie 'hi from other world' avec l'id 'test'
          ws.send('testhi from other world');
        }
        else {
          // renvoie ce qu'a envoye le client
          ws.send(message);
        };
        break;
      case 'cote':
        if (content == '123456789012345') {
          ws.send('coreok')
        } else {
          ws.send('coreno')
        }
        break;
      // si pas de case pour id -> renvoie ce qu'a envoye le client avec id = 'noca'
      default:
        ws.send('noca' + message);
        break;
    };
  });
  ws.on('close', function (code, reason) {
        console.log("Connection closed");
    });
});
