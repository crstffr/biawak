
var Stat = require('../../model/stat');

module.exports = new RequestStats();

function RequestStats() {

    return new Stat('nginx/requests', {
        incrementOn: 'tail:nginx.access'
    });

}
