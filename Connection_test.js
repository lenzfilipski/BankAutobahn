var mysql = require('mysql');

var con = mysql.createConnection({
  host: '78.201.71.90'
  user: 'root'
  password: '1234'
  database: 'TEST'
});

con.connect(function(err)){
  if (err) throw err;
  console.log("Connected!");
});
