const fs = require('fs');
const https = require('https');

const server = https.createServer({
  cert: fs.readFileSync('/etc/letsencrypt/live/ws.bank.filipski.fr/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/ws.bank.filipski.fr/privkey.pem')
});

var conect = false;
var identifiant = "";
var values = [[]];
var mysql = require('mysql');
var WebSocket = require('ws'); // Import ws
var serv1 = new WebSocket.Server({ server }); // Met en place le nouveau serveur sur le port 4445

serv1.on('connection', function(ws) {
  console.log('connected');
  ws.on('message', function(message_str) {
    var message = message_str;
    var id = message.slice(0, 4);
    var content = message.slice(4);
    console.log('Recieved: ' + id + ' || ' + content);
    console.log("AAAAAAAAA "+conect);


    if (!conect) { // If not already connected
      switch (id) {

        case 'conn': // conecte to a account
            var iden = content.slice(0, 10);
            var pw = content.slice(10);
            var con = mysql.createConnection({
              multipleStatements: true,
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
                  console.log("BBBBBBBBB "+conect);
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
              multipleStatements: true,
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

            var maxidi = 9999999999;
            var lastidi = 0;
            var newidi = 0;

            var con = mysql.createConnection({
              multipleStatements: true,
              host: 'localhost',
              user: 'root',
              password: '1234',
              database: 'TEST'
            });

            con.query('SELECT * FROM users' , function(err, rows) {
              lastidi = rows.length;
              console.log(lastidi);
              lastidi += 1;
              newidi = maxidi - lastidi;

              console.log(newidi);
              ws.send("newi" + newidi);

            });




            break;


        case 'crea': // create a new account

            var iden = content.slice(0, 10);
            var pw = content.slice(10);

            var con = mysql.createConnection({
              multipleStatements: true,
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


      switch (id) {
        case 'refr':
        	  if (conect) { // If already conected

                  var con = mysql.createConnection({
                    multipleStatements: true,
                    host: 'localhost',
                    user: 'root',
                    password: '1234',
                    database: 'TEST'
                  });
                  con.connect(function(err){
                    if (err) throw err;
                    console.log("Connected!");
                    values = [[identifiant]];
                  });

                  con.query('SELECT solde FROM accounts WHERE account=?', [values] , function(err, rows) {
                    if (!err && rows.length !== 0){
                      ws.send('capi' + rows[0].solde);
                    }
                    else {
                      ws.send("cape");
                    }
                    });

                    con.end();
        	          };
                    break;

        case 'vire':
      	  if (conect) { // If already conected

                var destinataire = content.slice(0, 10);
                console.log(destinataire);
                var montant = content.slice(10);
                var status = false;
                var montantDestinataire = 0;
                console.log(montant)

                var con = mysql.createConnection({
                  multipleStatements: true,
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
                    if (rows[0].solde >= montant) {
                      status = true;
                      var montantAccount = rows[0].solde;
                    }
                    else {
                      status = false;
                      ws.send("vivono");
                    }
                  }
                  else{
                    ws.send("vivono");
                  }

                    console.log(status);

                    if (status) {
                      values = [[destinataire]];
                      con.query('SELECT solde FROM accounts WHERE account=?', [values] , function(err, rows) {
                        if (err) {
                          status = false;
                          ws.send("vivono");
                        }
                        else {
                          montantDestinataire = rows[0].solde;
                        }
                        });
                    }

                    if (status) {
                      var reste = montantAccount - montant;
                      solde = reste;
                      console.log(solde);
                      values = [[solde]];
                      var values2 = [[identifiant]];
                      con.query('UPDATE accounts SET solde=? WHERE account=?', [values,values2] , function(err, rows) {
                      });

                      var newmontant = montantDestinataire + montant;
                      solde = newmontant
                      console.log(solde);
                      values = [[solde]];
                      var values2 = [[destinataire]];
                      con.query('UPDATE accounts SET solde=? WHERE account=?', [values,values2] , function(err, rows) {
                      });
                      ws.send("vicook");
                    }
                  else {
                    ws.send("vivono");
                  }

                  });
                con.end();
      	       }
                break;

      };
    });

    ws.on('close', function (code, reason) {
      console.log("Connection closed: " + reason);
    });

  });


server.listen(4445);

