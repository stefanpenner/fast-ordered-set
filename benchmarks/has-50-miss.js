'use strict';

var factories = require('./factories');

console.log('[hasMiss50]');
require('do-you-even-bench')(factories.byTest('hasMiss50'));
