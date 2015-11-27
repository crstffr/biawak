#!/usr/bin/env node

var _ = require('lodash');
var server = require('./static');
var events = require('./lib/events');
var loader = require('./lib/loader');
var stream = require('./lib/model/stream');
var IpInfo = require('./lib/model/ipinfo');

loader.loadStats();
loader.loadTails();
server.start();

events.on('tail:*', function(which, data) {
    stream.push(data);
});

events.on('tail:nginx.access', function(data) {
    var ip = _.get(data, 'params.remote_addr');
    if (ip) {
        var info = new IpInfo(ip);
        info.child('events').push(data);
    }
});

