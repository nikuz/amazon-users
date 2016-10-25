'use strict';

// ---------
// public methods
// ---------

function setValueAsHuman(field, value) {
  var i = 0,
    l = value.length;

  for (; i < l; i++) {
    browser.addValue(field, value[i]);
    browser.pause(Math.random() * 1000);
  }
}

// ---------
// interface
// ---------

exports = module.exports = {
  setValueAsHuman
};
