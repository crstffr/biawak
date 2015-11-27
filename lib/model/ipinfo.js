
var _ = require('lodash');
var Model = require('./model');
var geoip = require('geoip-lite');

module.exports = IpInfoModel;

function IpInfoModel(ip) {

    var realIp = ip;
    var safeIp = _.kebabCase(realIp);
    var model = new Model('ipinfo/' + safeIp + '/');

    model.once('value', function(snapshot) {

        if (!snapshot.child('ip').exists()) {
            model.child('ip').set(realIp);
        }

        if (!snapshot.child('geo').exists()) {
            model.child('geo').set(geoip.lookup(realIp));
        }

    });

    return model;

}
