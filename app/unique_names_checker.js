'use strict';

var _ = require('underscore'),
  names = require('../sources/users'),
  providers = require('../sources/providers'),
  uniqueNames = [],
  notUniquesNames = [];

for (let i = 0, l = names.length; i < l; i++) {
  if (!_.contains(uniqueNames, names[i])) {
    uniqueNames.push(names[i]);
  } else {
    notUniquesNames.push(names[i]);
  }
}
if (notUniquesNames.length) {
  console.log('Not uniques names count: %d', notUniquesNames.length);
  console.log(notUniquesNames);
}

console.log('');
console.log('Done!');
