
var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var nconf = require('nconf');
var mkdir = require('mkdirp');

module.exports = Writer;

function Writer(filepath) {

    var _this = this;
    var _data = {};

    this.read = function() {
        try {
            _data = require(filepath);
        } catch(e) {
            console.log('> ------------------------------------------------');
            console.log('> Config does not exist, will create one.');
            console.log('> ------------------------------------------------');
        }
    };

    this.get = function(path, defaultVal) {
        return (path) ? _.get(_data, path, defaultVal) : _data;
    };

    this.set = function(key, val) {
        var temp = {};
        _.set(temp, key, val);
        _data = _.defaultsDeep(temp, _data)
    };

    this.rm = function(key) {
        delete _data[key];
    };

    this.save = function () {
        mkdir(path.parse(filepath).dir, function (err) {
            if (err) {
                throw Error(err);
            } else {
                var str = 'module.exports = ' + JSON.stringify(_data, null, 4) + ';';
                fs.writeFileSync(filepath, str, {}, function(err){
                    throw new Error(err);
                });
            }
        });
    };

    _this.read();

}
