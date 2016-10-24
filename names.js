'use strict';

var _ = require('underscore'),
  names = require('./sources/users'),
  providers = require('./sources/providers');

console.log('');

for (let i = 0, l = 10; i < l; i++) {
  let provider = providers[Math.floor(Math.random() * providers.length)];
  console.log(`${names[i]}@${provider}`);
}

// unique names checker:
// {
//   let uniqueNames = [],
//     notUniquesNames = [];
//
//   for (let i = 0, l = names.length; i < l; i++) {
//     if (!_.contains(uniqueNames, names[i])) {
//       uniqueNames.push(names[i]);
//     } else {
//       notUniquesNames.push(names[i]);
//     }
//   }
//   if (notUniquesNames.length) {
//     console.log('Not uniques names count: %d', notUniquesNames.length);
//     console.log(notUniquesNames);
//   }
// }

console.log('');
console.log('Done!');