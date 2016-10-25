'use strict';

var providers = require('../../sources/providers.json');

// ---------
// public methods
// ---------

function generate(userName) {
  userName = userName.replace(' ', '.');
  return `${userName}@${providers[Math.floor(Math.random() * providers.length)]}`;
}

// ---------
// interface
// ---------

exports = module.exports = {
  generate
};
