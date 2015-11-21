var _ = require('lodash');
var Tail = require('tail').Tail;
var Tailor = require('../tailor')('nginx.access');
var tail = new Tail('/var/log/nginx/access.log');
var http = require('http-string-parser');
var moment = require('moment');

var format = '$http_host\t$remote_addr\t$remote_user\t$time_iso8601\t' +
             '$request\t$status\t$body_bytes_sent\t$request_time\t' +
             '$http_referer\t$http_user_agent';

var map = format.replace(/\$/g, '').split('\t');

tail.on("line", function(line) {

    var key;
    var req;
    var data = Tailor.parse(line);

    _.each(line.split('\t'), function(val, i){

        key = map[i];

        switch (key) {

            case 'request':
                req = http.parseRequest(val);
                req.uri = decodeURI(req.uri);
                data.params[key] = req;
                break;

            case 'time_iso8601':
                data.timestamp = moment(val).unix();
                break;

            default:
                data.params[key] = val;
                break;

        }

    });

    console.log(data);

});

module.exports = tail;
