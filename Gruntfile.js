'use strict';

var seleniumServer = require('selenium-standalone'),
  wdioConfFile = './wdio.conf.js',
  confBackupFile = `${wdioConfFile}.old`,
  standaloneConfig = {
    baseURL: 'http://selenium-release.storage.googleapis.com',
    version: '2.53.1',
    drivers: {
      chrome: {
        version: '2.25',
        arch: process.arch,
        baseURL: 'http://chromedriver.storage.googleapis.com'
      },
      ie: {
        version: '2.53',
        arch: process.arch,
        baseURL: 'http://selenium-release.storage.googleapis.com'
      },
      firefox: {
        version: '0.9.0',
        arch: process.arch,
        baseURL: 'https://github.com/mozilla/geckodriver/releases/download'
      }
    }
  };

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-webdriver');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.initConfig({
    webdriver: {
      test: {
        configFile: wdioConfFile
      }
    },
    jscs: {
      src: [
        './app/**/*.js'
      ],
      options: {
        preset: 'airbnb',
        config: './.jscsrc'
      }
    },
    jshint: {
      options: {
        jshintrc: './.jshintrc'
      },
      all: [
        './app/**/*.js'
      ]
    }
  });

  grunt.task.registerTask('syntax', [
    'jscs',
    'jshint'
  ]);

  var seleniumProcess;
  grunt.task.registerTask('seleniumInstall', function() {
    var done = this.async();
    seleniumServer.install(standaloneConfig, done);
  });
  grunt.task.registerTask('seleniumStart', function() {
    var done = this.async();
    seleniumServer.start(standaloneConfig, function(err, response) {
      if (err) {
        done(err);
      } else {
        seleniumProcess = response;
        done();
      }
    });
  });
  grunt.task.registerTask('seleniumStop', function() {
    seleniumProcess.kill();
  });
  grunt.task.registerTask('restoreConfig', function() {
    if (grunt.file.exists(confBackupFile)) {
      grunt.file.copy(confBackupFile, wdioConfFile);
      grunt.file.delete(confBackupFile);
    }
  });

  grunt.task.registerTask('registration', function() {
    grunt.option('force', true);
    process.on('SIGINT', () => {
      this.async()(false);
    });

    var tasks = [
        'seleniumInstall',
        'seleniumStart',
        'webdriver',
        'seleniumStop',
        'restoreConfig'
      ],
      target = grunt.option('target'),
      wdioConf = require(wdioConfFile).config;

    wdioConf.specs = ['./app/tasks/registration.js'];

    grunt.file.copy(wdioConfFile, confBackupFile);
    grunt.file.write(wdioConfFile, 'exports.config = ' + JSON.stringify(wdioConf, null, 2));

    grunt.task.run(tasks);
  });
};
