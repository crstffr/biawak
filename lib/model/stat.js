var _ = require('lodash');
var moment = require('moment');
var Model = require('./model');
var events = require('../events');

module.exports = StatModel;

function StatModel(path, options) {

    var _this = this;
    var lastVal = 0;
    var currVal = 0;
    var interval = 0;

    var model = new Model('stat').child(path);
    this.history = model.child('history');
    this.realtime = model.child('realtime');

    _this.settings = _.defaultsDeep({}, options, {
        record: true,       // should we save historical records
        interval: 10000,    // how often whould we save records
        incrementOn: '',    // what event triggers value increment
        decrementOn: '',    // what event triggers value decrement
        recordOn: ''        // what event triggers value recording
    });

    _this.stop = _stop;
    _this.start = _start;
    _this.update = _update;
    _this.record = _record;
    _this.increment = _increment;
    _this.decrement = _decrement;

    if (_this.settings.incrementOn) {
        events.on(_this.settings.incrementOn, _increment);
    }

    if (_this.settings.decrementOn) {
        events.on(_this.settings.decrementOn, _decrement);
    }

    /**
     *
     * @private
     */
    function _start() {
        if (_this.settings.record) {
            interval = setInterval(_this.record, _this.settings.interval);
        }
    }

    /**
     *
     * @private
     */
    function _stop() {
        clearInterval(interval);
    }

    /**
     *
     * @param val
     * @private
     */
    function _update(val) {
        currVal = val;
        _this.realtime.set(currVal);
    }

    /**
     *
     * @private
     */
    function _increment() {
        _this.realtime.transaction(function (current_value) {
            return currVal = (current_value || 0) + 1;
        });
    }

    /**
     *
     * @private
     */
    function _decrement() {
        _this.realtime.transaction(function (current_value) {
            return currVal = (current_value || 0) - 1;
        });
    }



    /**
     * Make a historical record of the current value.
     *
     * @private
     */
    function _record() {

        if (!_this.settings.record) { return; }

        // date in mm-dd-yyyy format for storage in Firebase
        var date = _.kebabCase(moment().format('L'));

        // num of seconds since midnight, saves 10 chars for each entry
        var time = moment().diff(moment().startOf('day'), 'seconds');

        // compare this new stat entry with the last one.  if they are the exact
        // same, then don't save the stat.  if they are not equal, then save it.
        _this.history.child(date).limitToLast(1).once('value', function (snapshot) {

            if (!snapshot.exists()) {

                // if the route doesn't exist at all then
                // go ahead and save the data straight away.
                _this.history.child(date).child(time).set(currVal);

            } else {

                // otherwise, check the last stored value
                // with our current value. if they differ,
                // then save the data.
                lastVal = _.values(snapshot.val())[0];
                if (_.isEqual(currVal, lastVal) === false) {
                    _this.history.child(date).child(time).set(currVal);
                }
            }
        });
    }
}
