#!/usr/bin/env node

var config = require('./lib/config');
var events = require('./lib/events');
var loader = require('./lib/loader');
var stream = require('./lib/model/stream');

loader.loadTails();

events.on('tail:*', function(which, data) {

    stream.push(data);

});
