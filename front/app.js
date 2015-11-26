var angular = require('angular');
var uirouter = require('angular-ui-router');
var components = require('./comps');

module.exports = angular
    .module('app', ['ui.router', 'components'])
    .service('digest', require('./util/digest'))
    .config(require('./routes'));
