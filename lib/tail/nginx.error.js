var _ = require('lodash');
var moment = require('moment');
var Tail = require('tail').Tail;
var events = require('../events');

module.exports = function (log, type) {

    var tail = new Tail(log);
    var tailor = require('../tailor')(type);

    tail.on('line', function (line) {

        var key;
        var data = tailor.parse(line);

        var date = Date.parse(line.substr(0, 19));

        if (!isNaN(date)) {
            data.timestamp = moment(date).unix();
        }

        events.emit('tail:' + type, data);

    });

    return tail;

};
