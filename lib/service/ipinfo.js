
var IpInfo = require('../model/ipinfo');
var geoip = require('geoip-lite');

module.exports = IpInfoService;

function IpInfoService() {

    var _this = this;

    this.lookup = function(ip) {

        var ipinfo = new IpInfo(ip);

        ipinfo.lookup();

        return _this.check(ip).then(function(exists){
            if (!exists) {
                return geoip.lookup(ip);
            }
        });
    };

}
