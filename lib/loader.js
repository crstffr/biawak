
var _ = require('lodash');
var out = require('./util/out');
var config = require('./config');
var loader = {};

loader.loadTails = function() {

    var tails = config.tails;

    if (!tails) {
        out.configError('No tails have been configured, run install to set one up.');
        return;
    }

    _.each(tails, loader.loadTail);

};

loader.loadTail = function(data, type) {
    var tail = require('./tail/' + type)(data.file, type);
    console.log('Tail loaded:', type);
    return tail;
};


// @TODO build stats selection into install/config
loader.loadStats = function() {
    _.each([
        'nginx/requests'
    ], loader.loadStat);
};

loader.loadStat = function(which) {
    var stat = require('./stats/' + which);
    stat.start();
};


module.exports = loader;
