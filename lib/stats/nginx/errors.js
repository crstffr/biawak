
var Stat = require('../../model/stat');

module.exports = new ErrorStat();

function ErrorStat() {

    return new Stat('nginx/errors', {
        incrementOn: 'tail:nginx.error'
    });

}
