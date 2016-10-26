'use strict';

var providers = require('../../sources/providers.json');

// ---------
// public methods
// ---------

function generate(userName) {
  userName = userName.replace(' ', '.');
  return `${userName}@${providers[Math.floor(Math.random() * providers.length)]}`;
}

function change(email) {
  email = email.split('@');
  return `${email[0]}${Math.floor((Math.random() * 10) + 1)}@${email[1]}`;
}

// ---------
// interface
// ---------

exports = module.exports = {
  generate,
  change
};
