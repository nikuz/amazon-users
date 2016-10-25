'use strict';

var colors = require('colors'),
  emailTools = require('../tools/email'),
  passwordTools = require('../tools/password'),
  inputTools = require('../tools/input');

exports = module.exports = function(user) {
  var email = emailTools.generate(user),
    password = passwordTools.generate();

  var signupLink = '.nav-signin-tooltip-footer a',
    form = '#ap_register_form',
    welcomeMessage = '.welcome-msg';

  browser
    .url('/')
    .waitForVisible(signupLink);

  browser
    .click(signupLink)
    .waitForVisible(form);

  inputTools.setValueAsHuman('#ap_customer_name', user);
  inputTools.setValueAsHuman('#ap_email', email);
  inputTools.setValueAsHuman('#ap_password', password);
  inputTools.setValueAsHuman('#ap_password_check', password);

  browser
    .click(`${form} input[type="submit"]`)
    .waitForVisible(welcomeMessage);

  console.log('');
  if (browser.isVisible(welcomeMessage)) {
    console.log('Registration success: %s'.green, user);
    return {
      name: user,
      email,
      password
    };
  } else {
    console.log('Registration fault: %s'.red, user);
    return null;
  }
};
