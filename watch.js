#!/usr/bin/env node

var config = require('./lib/config');
var events = require('./lib/events');
var loader = require('./lib/loader');

var tails = config.get('tails');

if (!tails) {
    console.error('No tails have been configured, run install.js to set one up.');
    process.exit(9); // invalid argument exit?
}

loader.loadTails(tails);

events.on('nginx.access', function(data){
    console.log(data);
});
