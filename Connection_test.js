var mysql = require('mysql');

var con = mysql.createConnection({
  host: '78.201.71.90',
  user: 'root',
  password: '1234',
  database: 'TEST'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


//Récupère compte et mot de passe
con.query('SELECT account, password FROM users', function(err, rows, fields) {
  if (!err)
    console.log('account number: ', rows[0].account,' account password: ', rows[0].password);
  else
    console.log('Error while performing Query.');
  });

  //Créer un compte
  con.query('INSERT INTO users (account, password) VALUES (0000000002, 4567)', function(err, rows, fields) {
    if (!err)
      console.log('Account created!');
    else
      console.log('Error while performing Query.');
    });

con.end();
