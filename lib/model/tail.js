var _ = require('lodash');
var path = require('path');
var nodetail = require('tail');
var events = require('../events');

module.exports = Tail;

function Tail(log, type) {

    // Get an absolute path to the log file
    // if the supplied log path is relative.

    if (!path.isAbsolute(log)) {
        log = path.resolve(process.cwd(), log);
    }

    var tail = new nodetail.Tail(log);


    /**
     * Storage for all line parser methods.
     * @type {Array} of functions
     */
    var parsers = [];


    /**
     *
     * @param {Function} cb
     */
    this.parser = function(cb) {
        parsers.push(cb);
    };

    // Register a default parser for every tail,
    // which adds a bit of structure to every
    // stream event object.

    this.parser(function(line, data){
        return {
            params: {},
            type: type,
            rawstring: line,
            timestamp: Date.now()
        }
    });


    /**
     * Start the tail watching for changes and new lines.
     * When changes occur, parse the new line and emit a
     * tail:event.
     */
    this.start = function() {
        tail.on('line', function (line) {
            console.log('new line', line);
            var data = _parse(line);
            events.emit('tail:' + type, data);
        });
        console.log('Tail started:', type);
    };


    /**
     * Stop the tail from watching anymore.
     */
    this.stop = function() {
        tail.unwatch();
        console.log('Tail stopped:', type);
    };


    /**
     * Resume a stopped tail.
     */
    this.resume = function() {
        tail.watch();
        console.log('Tail resumed:', type);
    };


    /**
     * Execute the attached data parsers and return the result.
     *
     * @param {String} line
     * @param {Object} [data]
     * @returns {Object}
     * @private
     */
    function _parse(line, data) {
        _.each(parsers, function(cb){
            data = _.attempt(cb, line, data);
        });
        return data;
    }

}
