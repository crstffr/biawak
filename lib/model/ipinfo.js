
var _ = require('lodash');
var Model = require('./model');
var geoip = require('geoip-lite');

module.exports = IpInfoModel;

function IpInfoModel(ip) {

    var realIp = ip;
    var safeIp = _.kebabCase(realIp);
    var model = new Model('ipinfo/' + safeIp + '/');

    model.once('value', function(snapshot) {
        if (!snapshot.exists()) {
            var data = {
                ip: realIp,
                events: {},
                geo: geoip.lookup(realIp)
            };
            model.set(data);
        }
    });

    return model;

}
