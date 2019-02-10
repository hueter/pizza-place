const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'mysql',
  user: 'matter_user',
  password: 'pizza123',
  database: 'matter'
});

module.exports = connection.connect();
