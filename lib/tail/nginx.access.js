var _ = require('lodash');
var moment = require('moment');
var Tail = require('tail').Tail;
var httpsp = require('http-string-parser');
var events = require('../events');

module.exports = function (log, type) {

    var tail = new Tail(log);
    var tailor = require('../tailor')(type);

    var format = '$http_host\t$remote_addr\t$remote_user\t$time_iso8601\t' +
        '$request\t$status\t$body_bytes_sent\t$request_time\t' +
        '$http_referer\t$http_user_agent';

    var map = format.replace(/\$/g, '').split('\t');

    tail.on('line', function (line) {

        var key;
        var data = tailor.parse(line);

        _.each(line.split('\t'), function (val, i) {

            key = map[i];
            switch (key) {

                case 'request':
                    data.params[key] = httpsp.parseRequest(val) || val;
                    break;

                case 'time_iso8601':
                    data.timestamp = moment(val).unix() * 1000;
                    break;

                default:
                    data.params[key] = val;
                    break;
            }
        });

        events.emit('tail:' + type, data);

    });

    return tail;

};
