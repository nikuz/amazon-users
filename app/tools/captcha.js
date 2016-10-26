'use strict';

var fs = require('fs'),
  http = require('http'),
  https = require('https'),
  async = require('async'),
  tesseract = require('node-tesseract');

// ---------
// public methods
// ---------

function solve(url) {
  return new Promise(function(resolve, reject) {
    var captchaFile;
    async.series([
      function(callback) {
        var controller = url.indexOf('https') === 0 ? https : http;
        controller.get(url, function(res){
          if(res.statusCode === 200){
            let fileName = '/var/tmp/'+new Date().getTime()+'.jpg',
              file = fs.createWriteStream(fileName);

            res.pipe(file);
            captchaFile = fileName;
            callback();
          } else {
            console.log(res.statusCode);
            callback();
          }
        }).on('error', callback);
      },
      function(callback) {
        if (captchaFile) {
          tesseract.process(captchaFile, callback);
        } else {
          callback();
        }
      }
    ], function(err, response) {
      if (err) {
        reject(err);
      } else {
        resolve(response[1]);
      }
    });
  });
}

// ---------
// interface
// ---------

exports = module.exports = {
  solve
};
