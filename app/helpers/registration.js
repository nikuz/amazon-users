'use strict';

var colors = require('colors'),
  emailTools = require('../tools/email'),
  captchaTools = require('../tools/captcha'),
  passwordTools = require('../tools/password');

function fillTheForm(user, email, password, captcha) {
  var welcomeMessage = '.welcome-msg',
    emailAlreadyUsedMessage = '.a-alert-warning .a-alert-heading',
    captchaField = '#auth-captcha-guess',
    form = '#ap_register_form';

  browser
    .setValue('#ap_customer_name', user)
    .setValue('#ap_email', email)
    .setValue('#ap_password', password)
    .setValue('#ap_password_check', password);

  if (captcha) {
    browser.setValue(captchaField, captcha);
  }

  browser
    .click(`${form} input[type="submit"]`)
    .waitUntil(function() {
      return browser.isVisible(welcomeMessage) === true
        || browser.isVisible(emailAlreadyUsedMessage) === true
        || browser.isVisible(captchaField) === true;
    });

  if (browser.isVisible(welcomeMessage)) {
    console.log('');
    console.log('Registration success: %s'.green, user);
    return {
      name: user,
      email,
      password
    };
  }

  if (browser.isVisible(emailAlreadyUsedMessage)) {
    browser
      .back()
      .waitForVisible(form);

    return fillTheForm(user, emailTools.change(email), password);
  }

  if (browser.isVisible(captchaField)) {
    let captchaUrl = browser.getAttribute('#auth-captcha-image', 'src'),
      captchaResolved;

    captchaTools.solve(captchaUrl).then(function(result) {
      captchaResolved = result;
    }).catch(function(err) {
      console.log(err);
      captchaResolved = true;
    });

    browser.waitUntil(function() {
      return captchaResolved;
    });

    return fillTheForm(user, email, password, captchaResolved);
  }

  console.log('');
  console.log('Registration fault: %s'.red, user);
  return null;
}

// ---------
// public methods
// ---------

function registration(user) {
  var email = emailTools.generate(user),
    password = passwordTools.generate(),
    signupLink = '.nav-signin-tooltip-footer a';

  browser
    .url('/')
    .waitForVisible(signupLink);

  browser
    .click(signupLink)
    .waitForVisible('#ap_register_form');

  return fillTheForm(user, email, password);
}

// ---------
// interface
// ---------

exports = module.exports = registration;
