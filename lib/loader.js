var _ = require('lodash');
var path = require('path');
var out = require('./util/out');
var config = require('./config');

module.exports = new Loader();

function Loader() {

    var _this = this;

    this.loadTails = function () {
        if (!config.tails) {
            out.configError('No tails have been configured, run install to set one up.');
        } else {
            _.each(config.tails, _this.loadTail);
        }
    };

    this.loadTail = function (data, type) {
        var Tail = require('./tail/' + type);
        var tail = new Tail(data.file, type);
        tail.start();
    };

}

