'use strict';

var mysql = require('mysql'),
  connection;

if (!connection) {
  connection = mysql.createPool({
    host: 'localhost',
    user: 'amazon',
    password: 'amazon',
    database: 'amazon',
    connectionLimit: 10
  });
}

exports = module.exports = connection;
