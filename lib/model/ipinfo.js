
var _ = require('lodash');
var Model = require('./model');
var geoip = require('geoip-lite');

module.exports = IpInfoModel;

function IpInfoModel(ip) {

    var realIp = ip;
    var safeIp = _.kebabCase(realIp);
    var model = new Model('ipinfo/' + safeIp + '/');

    model.once('value', function(snapshot) {
        if (!snapshot.child('geo').exists()) {
            model.set({
                ip: realIp,
                geo: geoip.lookup(realIp)
            });
        }
    });

    return model;

}
