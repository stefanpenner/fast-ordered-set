var BlankObject = require('blank-object');
var key = Math.random() + ' ' + new Date() + 'set_key';
var idKey = Math.random() + ' ' + new Date() + 'id_key';
var id = 0;

module.exports = Set;

function Set(initialValues, __id__) {
  this.__id__ = __id__ || 'id';
  this.size = 0;
  this._values = undefined;
  this._map = undefined;

  if (initialValues) this._prime(initialValues);
}

Object.defineProperty(Set.prototype, 'map', {
  get: function() {
    return this._map || (this._map = new BlankObject());
  }
});

Object.defineProperty(Set.prototype, 'values', {
  get: function() {
    return this._values || (this._values = []);
  }
});

Set.prototype._prime = function(values) {
  for (var i = 0; i < values.length; i++)
    this.add(values[i]);
};

Set.prototype._getId = function getId(obj) {
  if (obj !== null && typeof obj === 'object') {
    if (obj[this.__id__]) { return obj[this.__id__]; }
    return this._brand(obj);
  } else if (obj === 'undefined') {
    return '(undefined)';
  }
  return obj;
};

Set.prototype._brand  = function getId(obj) {
  return obj[key] = idKey + (id++);
};

Set.prototype.has = function(obj, id) {
  return (this._map && this.map[ arguments.length > 1 ? id : this._getId(obj)]) !== undefined;
};

Set.prototype.intersection = function(set) {
  var result = new this.constructor();

  for (var i = 0; i < set.values.length ; i++) {
    var entry = set.values[i];
    if (this.has(entry)) {
      result.add(entry);
    }
  }

  return result;
};

Set.prototype.add = function(obj) {
  var id = this._getId(obj);

  if (!this.has(obj, id)) {
    this.size = this.values.push(obj);
    this.map[id] = true;
  }

  return this;
};

Set.prototype.delete = function(obj) {
  var id = this._getId(obj);

  if (this.has(obj, id)) {
    var index = this.values.indexOf(obj);
    this.size--;
    this.values.splice(index, 1);
    delete this.map[id];
  }

  return this;
};

Set.prototype.union = function(set) {
  return new this.constructor(this.values.concat(set.values));
};

Set.prototype.deleteAll = function (values) {
  values.forEach(this.delete, this);

  return this;
};

Set.prototype.difference = function (values) {
  var input = values instanceof this.constructor ? values.values.slice() : values;
  var result = new this.constructor(input);
  for (var i = 0; i < this.values.length; i++) {
    var entry = this.values[i];
    if (result.has(entry)) {
      result.delete(entry);
    } else {
      result.add(entry);
    }
  }
  return result;
};

Set.prototype.forEach = function(_cb, binding) {
  if (this._values === undefined) { return; }

  var values = this.values;
  var cb = arguments.length === 2 ? _cb.bind(binding) : _cb;

  for (var i = 0; i < values.length; i++) {
    cb(values[i]);
  }
};
