'use strict';

var db = require('../database'),
  ProgressBar = require('progress'),
  users = require('../../sources/users'),
  registrationHelper = require('../helpers/registration');

describe('Registration', function() {
  it('create "users" database table if not exists', function async() {
    return new Promise(function(resolve, reject) {
      var query = `CREATE TABLE IF NOT EXISTS users (
        id MEDIUMINT NOT NULL AUTO_INCREMENT,
        name CHAR(30) NOT NULL,
        email CHAR(50) NOT NULL,
        password CHAR(10) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
      )`;

      db.query(query, function(err) {
        if (err) {
          reject();
        } else {
          resolve();
        }
      });
    });
  });

  var i = 0,
    l = users.length,
    bar = new ProgressBar('[:bar] :percent', {
      complete: '=',
      incomplete: ' ',
      width: 100,
      total: l
    });

  bar.tick(0);

  /*jshint loopfunc: true */
  for (; i < l; i++) {
    (function(user) {
      var alreadyRegistered = false,
        newUserData;

      it(`check that ${user} is not registered already`, function async() {
        return new Promise(function(resolve, reject) {
          db.query(`SELECT * from users WHERE name="${user}"`, function(err, rows) {
            if (err) {
              reject(err);
            } else {
              if (rows && rows.length) {
                alreadyRegistered = true;
              }
              resolve();
            }
          });
        });
      });

      it(`register new user ${user}`, function() {
        if (!alreadyRegistered) {
          newUserData = registrationHelper(user);
        }
      });

      it(`save data to the database register new user ${user}`, function async() {
        return new Promise(function(resolve, reject) {
          if (newUserData) {
            var fields = [
                'name',
                'email',
                'password'
              ],
              values = [
                newUserData.name,
                newUserData.email,
                newUserData.password
              ];

            db.query('INSERT INTO `users`(??) VALUES(?)', [fields, values], function(err) {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            });
          } else {
            resolve();
          }
        });
      });

      it('reload session', function() {
        bar.tick(1);
        if (newUserData) {
          browser.pause(1000 * 10);
          browser.reload();
        }
      });
    })(users[i]);
  }
  /*jshint loopfunc: false */
});
