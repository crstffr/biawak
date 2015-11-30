#!/usr/bin/env node

var _ = require('lodash');
var server = require('./static');
var events = require('./lib/events');
var loader = require('./lib/loader');
var packrat = require('./lib/packrat');
var stream = require('./lib/model/stream');
var User = require('./lib/model/user');
var Ip = require('./lib/model/ip');

loader.loadTails();
packrat.start();
server.start();

events.on('tail:*', function(which, data) {

    var key = stream.push(data).key();

    var event = {
        key: key,
        timestamp: data.timestamp
    };

    if (data.ip) {
        events.emit('ip', data.ip, event);
    }

    if (data.user) {
        events.emit('user', data.user, event);
    }

});

events.on('ip', function(ip, data) {
    var model = new Ip(ip);
    model.child('events').child(data.key).set(1);
});

events.on('user', function(user, data, key) {
    var model = new User(user);
    model.child('events').child(data.key).set(1);
});

