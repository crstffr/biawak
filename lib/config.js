
var nconf = require('nconf');
var mkdir = require('mkdirp');

var home = process.env['HOME'];
var configPath = home + '/.biawak/';
var configFile = configPath + 'config';

var config = {};

config.save = function() {
    mkdir(configPath, function(err){
        if (err) { throw Error(err); }
        else { nconf.save(); }
    });
};

config.get = nconf.get.bind(nconf);
config.set = nconf.set.bind(nconf);
config.file = nconf.file.bind(nconf);

config.file(configFile);
config.save();

module.exports = config;
