'use strict';

function getRandomNum() {
  // between 0 - 1
  var rndNum = Math.random();
  // rndNum from 0 - 1000
  rndNum = parseInt(rndNum * 1000);
  // rndNum from 33 - 127
  rndNum = (rndNum % 94) + 33;
  return rndNum;
}

function checkPunc(num) {
  return ((num >= 33) && (num <= 47)) ||
    ((num >= 58) && (num <= 64)) ||
    ((num >= 91) && (num <= 96)) ||
    ((num >= 123) && (num <= 126));
}

// ---------
// public methods
// ---------

function generate() {
  var length = 8,
    sPassword = '',
    i = 0,
    numI;

  for (; i < length; i++) {
    numI = getRandomNum();
    while (checkPunc(numI)) {
      numI = getRandomNum();
    }
    sPassword = sPassword + String.fromCharCode(numI);
  }

  return sPassword;
}

// ---------
// interface
// ---------

exports = module.exports = {
  generate
};
