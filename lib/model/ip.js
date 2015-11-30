
var _ = require('lodash');
var Model = require('./model');
var events = require('../events');
var geoip = require('geoip-lite');

module.exports = IPModel;

function IPModel(ip) {

    var realIp = ip;
    var safeIp = _.kebabCase(realIp);
    var model = new Model('ip/' + safeIp + '/');

    model.once('value', function(snapshot) {

        if (!snapshot.hasChild('ip')) {
            model.child('ip').set(realIp);
            events.emit('ip:new', realIp);
        }

        if (!snapshot.hasChild('geo')) {
            model.child('geo').set(geoip.lookup(realIp));
        }

    });

    return model;

}
