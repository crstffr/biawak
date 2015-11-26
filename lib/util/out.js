
var env = require('./env');

module.exports = (env.node()) ? serverOut : clientOut;

var serverOut = {
    configError: function(msg) {
        console.error(msg);
        process.exit(9);
    }
};

var clientOut = {
    configError: function(msg) {
        throw new Error(msg);
    }
};
