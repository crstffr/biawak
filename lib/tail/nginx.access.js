var _ = require('lodash');
var moment = require('moment');
var Tail = require('../model/tail');
var httpsp = require('http-string-parser');

module.exports = NginxAccessTail;

function NginxAccessTail(log, type) {

    var tail = new Tail(log, type);

    var format = '$http_host\t$remote_addr\t$remote_user\t$time_iso8601\t' +
        '$request_str\t$status\t$body_bytes_sent\t$request_time\t' +
        '$http_referer\t$http_user_agent';

    var map = format.replace(/\$/g, '').split('\t');

    tail.parser(function (line, data) {

        var key;

        _.each(line.split('\t'), function (val, i) {

            key = map[i];
            data.params[key] = val;

            switch (key) {

                case 'remote_addr':
                    data.ip = val;
                    break;

                case 'remote_user':
                    if (val !== '-') { data.user = val; }
                    break;

                case 'request_str':
                    data.params.request_obj = httpsp.parseRequest(val) || val;
                    break;

                case 'time_iso8601':
                    data.timestamp = moment(val).valueOf();
                    break;
            }
        });

        return data;

    });

    return tail;

}
