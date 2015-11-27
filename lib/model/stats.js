var Model = require('./model');

module.exports = StatsModel;

function StatsModel(path) {
    return new Model('stats/' + path);
}
