
var _ = require('lodash');

var tails = require('fs').readdirSync('./lib/tails/');

// Get an array of all of the available tails in our folder

module.exports = _.map(tails, function(name){
    return name.replace(/\.js$/, '');
});
