#!/usr/bin/env node

var _ = require('lodash');
var server = require('./static');
var events = require('./lib/events');
var loader = require('./lib/loader');
var ipinfo = require('./lib/model/ipinfo');
var stream = require('./lib/model/stream');

loader.loadTails();
server.start();

events.on('tail:*', function(which, data) {
    // console.log('data', data);
    stream.push(data);

});

events.on('tail:nginx.access', function(data){

    console.log('which', data);

    var ip = _.get(data, 'params.remote_addr');

    if (ip) {
        console.log('need info for', ip);
    }

});
