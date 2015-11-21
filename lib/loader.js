var _ = require('lodash');

var loader = {};

loader.loadTails = function(tails) {
    _.each(tails, loader.loadTail);
};

loader.loadTail = function(tail, type) {
    return require('./tails/' + type)(tail.file, type);
};

module.exports = loader;
