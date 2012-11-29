var util    = require('util'),
    events  = require('events'),
    cdblibc = require('./build/Release/cdblib').CDBLib;

var cdblib = function(opts) {
	if(!opts.filename)
		throw new Error('Must provide a filename');
	var filename = opts.filename;
	var callback = opts.callback || function(){};

	events.EventEmitter.call(this);
	
	this.on('connect', function(filename, cb) {
		_connect(this, filename, cb);
	});

	this.on('get', function(key, cb) {
		_get(this, key, cb);
	});

	this.on('close', function(cb) {
		_close(this, cb);
	});

	this.emit('connect', filename, callback);
};

util.inherits(cdblib, events.EventEmitter);

cdblib.prototype.connect = function(filename, cb) {
	this.emit('connect', filename, cb);
};

cdblib.prototype.get = function(key, cb) {
	this.emit('get', key, cb);
};

cdblib.prototype.close = function(cb) {
	this.emit('close', cb);
};

var _connect = function(t, filename, cb) {
	t.cdblibc = new cdblibc(filename);
	
	if(cb)
		cb(t);
};

var _get = function(t, key, cb) {
	var val = t.cdblibc.get(key);

	if(cb)
		cb(val);
};

var _close = function(t, cb) {
	t.cdblibc.close();
	
	if(cb)
		cb();
};

module.exports = cdblib;
