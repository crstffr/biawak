
var _ = require('lodash');
var path = require('path');
var fs = require('fs');

module.exports = {

    config: process.cwd() + '/user.config.js',

    tails: function() {

        var tails = fs.readdirSync('./lib/tail/');
        return _.map(tails, function(name){
            return name.replace(/\.js$/, '');
        });
    }

};
