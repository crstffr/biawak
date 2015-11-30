
var Tail = require('../model/tail');
var moment = require('moment');

module.exports = NginxErrorTail;

function NginxErrorTail(log, type) {

    var tail = new Tail(log, type);

    tail.parser(function (line, data) {

        var date = Date.parse(line.substr(0, 19));

        var ipreg = /client\: (([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}),/;
        var ip = line.match(ipreg)[1];
        if (ip) { data.ip = ip; }

        if (!isNaN(date)) {
            data.timestamp = moment(date).valueOf();
        }

        return data;

    });

    return tail;

}
