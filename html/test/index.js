// javascript execute par le serveur
// console.log(x) permet d'afficher x dans la console
const fs = require('fs');
const https = require('https');

// importe la bibliotheque websocket (ws) et cree un serveur qui ecoute le port 5001
const WebSocket = require('ws');
const server = https.createServer({
  cert: fs.readFileSync('/etc/letsencrypt/live/ws.bank.filipski.fr/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/ws.bank.filipski.fr/privkey.pem')
});
const serv1 = new WebSocket.Server({ server });

const mysql = require('mysql');
var db_conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bank',
});

//const bcrypt = require('bcrypt');
const saltRounds = 10;


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
      // Se connecter en comparant les entrees avec la base de donnes
      case 'conn':
        if (content == '123456789012345') {
          ws.send('coreok')
        } else {
          ws.send('coreno')
        };
        // var acc_id = mysqql.escape(content.slice(0, 10));
        // var acc_pw = content.slice(10);
        // db_conn.connect(function(err) {
        //   if (err) throw err;
        //   db_conn.query("SELECT acc_pw FROM bk_users WHERE acc_id = ?", [acc_id], function (err, result, fields) {
        //     if (err) throw err;
        //     bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
        //         // res == true
        //     });
        //     bcrypt.compare(someOtherPlaintextPassword, hash, function(err, res) {
        //         // res == false
        //     });
        //   });
        // });
        break;

      // Cree un compte en hachant le mot de passe
      case 'crea':
        console.log('created');
        ws.send('crcook');
        // var acc_id = mysql.escape(content.slice(0, 10));
        // var acc_pw = content.slice(10);
        // bcrypt.hash(acc_pw, saltRounds, function(err, hash) {
        //   if (err) throw err;
        //   db_conn.connect(function(err) {
        //     if (err) throw err;
        //     var insert = [acc_id, hash]
        //     db_conn.query("INSERT INTO bk_users (acc_id, acc_pw) VALUES ?", insert, function (err, result) {
        //       if (err) throw err;
        //       console.log('Account created:' + result.affectedRows);
        //       ws.send('crcook');
        //     });
        //   });
        // });
        break;

      // donne un id pour creer un nouveau compte
      case 'reqi':
        ws.send('newi9876543210');
        break;

      case 'refr':
        ws.send('capi153468');
        break;

      case 'vire':
        if (content == '12345') {
          ws.send('vicook');
        } else {
          ws.send('vicono');
        };
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

server.listen(5001);
