const fs = require('fs');
const https = require('https');

const server = https.createServer({
  cert: fs.readFileSync('/etc/letsencrypt/live/ws.bank.filipski.fr/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/ws.bank.filipski.fr/privkey.pem')
});

var values = [[]];
var mysql = require('mysql');
var WebSocket = require('ws'); // Import ws
var serv1 = new WebSocket.Server({ server }); // Met en place le nouveau serveur sur le port 4445

serv1.on('connection', function(ws) {
  console.log('connected');
  ws.on('message', function(message_str) {
    var conect = false;
    var identifiant = "";
    var message = message_str;
    var id = message.slice(0, 4);
    var content = message.slice(4);
    console.log('Recieved: ' + id + ' || ' + content);


    if (!conect) { // If not already connected
      switch (id) {

        case 'conn': // conecte to a account
            var iden = content.slice(0, 10);
            var pw = content.slice(10);
            var con = mysql.createConnection({
              host: 'localhost',
              user: 'root',
              password: '1234',
              database: 'TEST'
            });
            con.connect(function(err){
              if (err) throw err;
              console.log("Connected!");
            });
            values = [[iden]];
            con.query('SELECT account, password FROM users WHERE account=?', [values] , function(err, rows) {
              if (!err && rows.length !== 0){
                if (pw == rows[0].password){
                  ws.send("coreok");
                  conect = true;
                  identifiant = iden;
                }
                else
                  ws.send("coreno");
              }
              else
                ws.send("coreno");
              });
            con.end();
            break;

	case 'cote': // test connection to an account
            var iden = content.slice(0, 10);
            var pw = content.slice(10);
            var con = mysql.createConnection({
              host: 'localhost',
              user: 'root',
              password: '1234',
              database: 'TEST'
            });
            con.connect(function(err){
              if (err) throw err;
              console.log("Connected!");
            });
            values = [[iden]];
            con.query('SELECT account, password FROM users WHERE account=?', [values] , function(err, rows) {
              if (!err  && rows.length !== 0){
                if (pw == rows[0].password){
                  ws.send("coreok");
                }
                else
                  ws.send("coreno");
              }
              else
                ws.send("coreno");
              });
            con.end();
            break;

        case 'reqi': // create a new account

            var iden = 1234567890;
            ws.send("newi" + iden);

            break;


        case 'crea': // create a new account

            var iden = content.slice(0, 10);
            var pw = content.slice(10);

            var con = mysql.createConnection({
              host: 'localhost',
              user: 'root',
              password: '1234',
              database: 'TEST'
            });

            con.connect(function(err){
              if (err) throw err;
              console.log("Connected!");
            });
		        values = [[iden, pw]];
            con.query("INSERT INTO users (account, password) VALUES ?", [values], function(err, rows) {
              if (err) throw err
            });
		        values = [[iden, 420]];
            con.query("INSERT INTO accounts (account, solde) VALUES ?", [values], function(err, rows) {
              if (!err && rows.length !== 0) {
                console.log('Account created!');
                ws.send("crcook");
              }
              else {
                console.log('Error while performing Query.');
                ws.send("crcono");
              }
              });

            con.end();
            break;

      };
    };

    if (conect) { // If already conected
      switch (id) {
        case 'refr':

          var con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1234',
            database: 'TEST'
          });
          con.connect(function(err){
            if (err) throw err;
            console.log("Connected!");
          });
          values = [[identifiant]];
          con.query('SELECT solde FROM accounts WHERE account=?', [values] , function(err, rows) {
            if (!err && rows.length !== 0){
              ws.send('capi' + rows[0].solde);
            }
            else {
              ws.send("cape");
            }
            });

            con.end();
            break;

        case 'vire':

          var destinataire = content.slice(0, 10);
          var montant = content.slice(10);

          var con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1234',
            database: 'TEST'
          });
          con.connect(function(err){
            if (err) throw err;
            console.log("Connected!");
          });
          values = [[identifiant]];
          con.query('SELECT solde FROM solde WHERE account=?', [values] , function(err, rows) {
            if (!err && rows.length !== 0){
              if (rows[0].solde > montant) {
                status = true;
                var montantAccount = rows[0].solde;
              }
              else {
                status = false;
              }
            }
            else
              ws.send("coreno");
            });

          if (status) {
            values = [[destinataire]];
            con.query('SELECT solde FROM solde WHERE account=?', [values] , function(err, rows) {
              if (rows.length == 0) {
                status = false;
              }
              else {
                var montantDestinataire = rows[0].solde;
              }
              if (err) throw err;
              });
          }

          if (status) {
            var reste = montantAccount - montant;
            solde = reste;
            values = [[solde,identifiant]];
            con.query('UPDATE accounts SET solde=? WHERE account=?', [values] , function(err, rows) {
              if (err) throw err;
            });

            var newmontant = montantDestinataire + montant;
            solde = newmontant
            values = [[solde,destinataire]];
            con.query('UPDATE accounts SET solde=? WHERE account=?', [values] , function(err, rows) {
              if (err) throw err;
            });
          }


          con.end();
          break;

      };
    };

  });

  ws.on('close', function (code, reason) {
    console.log("Connection closed: " + reason);
  });
});

server.listen(4445);


