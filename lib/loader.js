
var _ = require('lodash');
var config = require('./config');
var loader = {};

loader.loadTails = function() {

    var tails = config.get('tails');

    if (!tails) {
        console.error('No tails have been configured, run install to set one up.');
        process.exit(9); // invalid argument exit?
        return;
    }

    _.each(tails, loader.loadTail);

};

loader.loadTail = function(data, type) {
    var tail = require('./tail/' + type)(data.file, type);
    console.log('Tail loaded:', type);
    return tail;
};

module.exports = loader;
