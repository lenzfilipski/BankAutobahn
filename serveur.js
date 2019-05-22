//Importe les paquet
const fs = require('fs');
const https = require('https');


//Créer une connection websocket HTTPS
const server = https.createServer({
  cert: fs.readFileSync('/etc/letsencrypt/live/ws.bank.filipski.fr/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/ws.bank.filipski.fr/privkey.pem')
});

//Variable globale
var conect = false;
var identifiant = "";
var values = [[]];

var mysql = require('mysql'); //Importe MySQL
var WebSocket = require('ws'); // Importe WebSocket
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Démare le serveur sur le port 4445
var serv1 = new WebSocket.Server({ server });

//Évènement basé sur les nouvelle conection
serv1.on('connection', function(ws) {

  console.log('connected');

  //Évènement à la réception de nouveaux message
  ws.on('message', async function(message_str) {

    //On récupère le message et on sépare l'identifiant du contenu du message
    var message = message_str;
    var id = message.slice(0, 4);
    var content = message.slice(4);
    console.log('Recieved: ' + id + ' || ' + content);


      switch (id) {
        //Requete de connection
        case 'conn':
            var iden = content.slice(0, 10);
            var pw = content.slice(10);

            //Information de connection du serveur à la base de données
            var con = mysql.createConnection({
              multipleStatements: true,
              host: 'localhost',
              user: 'root',
              password: '1234',
              database: 'TEST'
            });

            //Connection du serveur à la base de données
            con.connect(function(err){
              if (err) throw err;
              console.log("Connected!");
            });

            //On récupère le numéros de compte
            values = [[iden]];

            //Demande à la base de donée de comparer le numeros de compte et le mots de passe
            con.query('SELECT account, password FROM users WHERE account=?', [values] , function(err, rows) {

              //Si c'est bon on autorise la connection sinon on la refuse
              if (!err && rows.length !== 0){
                // Hash et compare le mot de passe rentre et le compare a celui de la BDD
                bcrypt.compare(pw, rows[0].password, function(err, res) {
                  if (res){
                    ws.send("coreok");
                    conect = true;
                    identifiant = iden;
                  }
                  else
                  {
                    ws.send("coreno");
                  }
                });
              }
              else
              {
                ws.send("coreno");
              }
              });

            con.end();
            break;

            //On teste la connection au compte avant de se connecter
	        case 'cote':

          //On sépare l'identifiant du mot de passe
            var iden = content.slice(0, 10);
            var pw = content.slice(10);

            //On créer les information de connection du serveur a la base de données
            var con = mysql.createConnection({
              multipleStatements: true,
              host: 'localhost',
              user: 'root',
              password: '1234',
              database: 'TEST'
            });
            //On connecte le serveur et la base de données
            con.connect(function(err){
              if (err) throw err;
              console.log("Connected!");
            });

            //On récupère le numéros de compte
            values = [[iden]];

            //On compare les identifiant de connection
            con.query('SELECT account, password FROM users WHERE account=?', [values] , function(err, rows) {

              //Si ils corresponde on autorise la connection et on connecte le client
              if (!err  && rows.length !== 0){
                  // Hash et compare le mot de passe rentre et le compare a celui de la BDD
                  bcrypt.compare(pw, rows[0].password, function(err, res) {
                    if (res){
                      ws.send("coreok");
                    }
                    else
                    {
                      ws.send("coreno");
                  }
                });
              }
              else
                ws.send("coreno");
              });

            con.end();
            break;


            //On demande à créer un nouveaux compte
        case 'reqi':
        //On définit les id
            var maxidi = 9999999999;
            var lastidi = 0;
            var newidi = 0;

            //On définit les information de connection entre le serveur et la base de données
            var con = mysql.createConnection({
              multipleStatements: true,
              host: 'localhost',
              user: 'root',
              password: '1234',
              database: 'TEST'
            });
            //On récupère le nombre de compte existant pour créer un id unique
            con.query('SELECT * FROM users' , function(err, rows) {
              lastidi = rows.length;
              console.log(lastidi);
              lastidi += 1;
              newidi = maxidi - lastidi;



              console.log(newidi);
              //On renvois l'id généré au client
              ws.send("newi" + newidi);

            });

            con.end();
            break;

            //On créer un nouveaux compte
        case 'crea':

        //On sépare l'id du mot de passe
            var iden = content.slice(0, 10);
            var pw = content.slice(10);

            //On définit les information de connection du serveur à la base de données
            var con = mysql.createConnection({
              multipleStatements: true,
              host: 'localhost',
              user: 'root',
              password: '1234',
              database: 'TEST'
            });
            // hash le mot de pass de l'utilisateur pour etre stocke dans la BDD
            let newHash = bcrypt.hashSync(pw, saltRounds);
              //On connecte le serveur a la base de données
              con.connect(function(err){
                if (err) { console.log(err);}
                console.log("Connected to DB!");
              });
                //On récupère l'identifiant et le mot de passe
                values = [[iden, newHash]];
                //On ajoute à la base de données le nouveax compte utilisateur avec son id et son mot de passe
                con.query("INSERT INTO users (account, password) VALUES ?", [values], function(err, rows) {
                  if (err) { console.log(err);};
                });




            //On ajoute à la base de données le compte au compte utilisateur
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


      switch (id) {

        //On demande a rafraichire son solde
        case 'refr':
        	  if (conect) {
              //On définit les information de connection entre le serveur et la base de données
                  var con = mysql.createConnection({
                    multipleStatements: true,
                    host: 'localhost',
                    user: 'root',
                    password: '1234',
                    database: 'TEST'
                  });

                  //On connecte le serveur à la base de données
                  con.connect(function(err){
                    if (err) throw err;
                    console.log("Connected!");
                    values = [[identifiant]];
                  });
                  //On récupère l'argent du compte connecté
                  con.query('SELECT solde FROM accounts WHERE account=?', [values] , function(err, rows) {
                    //Si il n'y a pas de problème on envois le solde au client sinon non
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

        //On éffectue un virement
        case 'vire':
      	  if (conect) {
            //On sépre l'utilisateur de montant a viré
                var destinataire = content.slice(0, 10);
                console.log(destinataire);
                //On évite les virement négatif
                var montant = Math.abs(content.slice(10));
                var status = false;
                console.log(montant)
                //On définit les information de connection du serveur à la base de données
                var con = mysql.createConnection({
                  multipleStatements: true,
                  host: 'localhost',
                  user: 'root',
                  password: '1234',
                  database: 'TEST'
                });
                //On conencte le serveur à la base de données
                con.connect(function(err){
                  if (err) throw err;
                  console.log("Connected!");
                });

                //On récupère l'id du compte qui envois l'argent
                values = [[identifiant]];
                con.query('SELECT solde FROM accounts WHERE account=?', [values] , function(err, rows) {
                  //Si il a l'argent on autorise le virement sinon on le refuse
                  if (!err && rows.length !== 0){
                    if (rows[0].solde >= montant) {
                      status = true;
                      var montantAccount = rows[0].solde;
                    }
                    else {
                      status = false;
                      ws.send("vicono");
                    }
                  }
                  else{
                    ws.send("vicono");
                  }

                    console.log(status);

                    if (status) {
                      //On récupère l'identifiant du compte qui reçois l'argent
                      values = [[destinataire]];
                      con.query('SELECT solde FROM accounts WHERE account=?', [values] , function(err, rows) {
                        //Si le compte n'existe pas on refuse sinon on met a jours l'argent des deux compte
                        if (err || identifiant == destinataire) {
                          status = false;
                          ws.send("vicono");
                        }
                        else {
                          //On calcule le montant d'argent restant
                          var montantDestinataire = rows[0].solde;
                          var reste = montantAccount - montant;
                          solde = reste;
                          console.log(solde);
                          //On récupère le compte et le nouveaux solde du client qui à envoyer l'argent
                          values = [[solde]];
                          var values2 = [[identifiant]];

                          //On met a jours l'argent du compte qui éffectue le virement
                          con.query('UPDATE accounts SET solde=? WHERE account=?', [values,values2] , function(err, rows) {
                            if (!err){
                              console.log('User found');
                            }else
                              console.log('Error while performing Query.');
                          });
                          //On calcule le nouveaux solde du client qui reçois l'argent
                          var newmontant = +montantDestinataire + +montant;
                          solde = newmontant
                          console.log(solde);
                          //On récupère le nouveaux solde et le destinataire du virement
                          values = [[solde]];
                          var values2 = [[destinataire]];
                          //On met a jours le compte du destinataire avec le nouveaux solde
                          con.query('UPDATE accounts SET solde=? WHERE account=?', [values,values2] , function(err, rows) {
                            if (!err){
                              console.log('Solde send');
                              ws.send("vicook");
                            }else{
                              ws.send("vicono");
                              console.log('Error while performing Query.');
                            }
                          });

                      }
                    });

                }
                });
      	       }
                break;

      };
    });
    //Lorque le client ce déconnecte on ferme le connection
    ws.on('close', function (code, reason) {
      console.log("Connection closed: " + reason);
      conect = false;
    });

  });

//Port d'écoute du serveur
server.listen(4445);

