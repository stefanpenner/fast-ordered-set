'use strict';

var FastOrderdSet = require('../');
var OrderedSet = require('ordered-set');
var SetLib = require('set');
var AbstractSet = require('abstract-set');
var SetJs = require('set-js');
var equalityFunction = function(a,b){return a == b;};
var lesserFunction = function(a,b){return a < b;};
var SpecializedSet = require('specialized-set')(equalityFunction, lesserFunction);
var SetCollection = require('set-collection');
var assert = require('assert');

function fastOrderedSet() {
  return new FastOrderdSet();
}

function es2015() {
  return new Set();
}

function orderedSet() {
  return new OrderedSet();
}

function setLib() {
  return new SetLib();
}

function abstractSet() {
  return new AbstractSet();
}
function setJs() {
  return new SetJs();
}

function specializedSet() {
  return new SpecializedSet();
}

function setCollection() {
  return new SetCollection();
}

assert(fastOrderedSet() instanceof FastOrderdSet);
assert(es2015() instanceof Set);
// is currently broken...
//assert(orderedSet() instanceof OrderedSet);
assert(setLib() instanceof SetLib);
assert(abstractSet() instanceof AbstractSet);
assert(setJs() instanceof SetJs);
assert(specializedSet()); // doesn't expose constructor...
assert(setCollection() instanceof SetCollection);

console.log('[alloc]');
require('do-you-even-bench')([
  { name: 'fast-ordered-set', fn: fastOrderedSet },
  { name: 'es2015',           fn: es2015 },
  //{ name: 'ordered-set',      fn: orderedSet },
  { name: 'set',              fn: setLib},
  { name: 'Set',              fn: bigSetLib},
  { name: 'abstract-set',     fn: abstractSet},
  { name: 'set-js',           fn: setJs},
  { name: 'specialized-set',  fn: specializedSet},
  { name: 'set-collection',   fn: setCollection},
]);
