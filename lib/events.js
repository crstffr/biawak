var Events = require('events');
var Emitter = Events.EventEmitter;

var instance = new Emitter();

module.exports = instance;
