
var _ = require('lodash');

module.exports = new Packrat();

/**
 * Packrats collect things. These packrats collect stats.
 * Monitor lizards are known to occassionally eat rats.
 *
 * @constructor
 */
function Packrat() {

    this.start = function() {
        _.each([
            'nginx/requests',
            'nginx/errors'
        ], function(which){
            require('./stats/' + which).start();
            console.log('Stat loaded:', which);
        });
    }
}
