
var fs = require('fs');
var _ = require('lodash');



module.exports = {

    tails: function() {

        var tails = fs.readdirSync('./lib/tail/');
        return _.map(tails, function(name){
            return name.replace(/\.js$/, '');
        });
    }

};
