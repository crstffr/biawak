
var events = require('../../events');
var Stats = require('../..//model/stats');

module.exports = new RequestStats();

function RequestStats() {

    var _this = this;
    var period = 60000;
    var count;
    var intval;
    var model;

    this.start = function() {
        count = 0;
        model = new Stats('nginx/requests/per-min');
        events.on('tail:nginx.access', 'requestStats', function(data) { count++; });
        intval = setInterval(_collect, period);
    };

    this.stop = function() {
        clearInterval(intval);
        events.releaseGroup('requestStats');
    };

    function _collect() {
        model.push({
            timestamp: Date.now(),
            count: count
        });
        count = 0;
    }

}
