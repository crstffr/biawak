var angular = require('angular');

require('./requests.css!');

module.exports = angular.module('requests', [])
    .directive('requests', function () {
        return {
            scope: {},
            restrict: 'E',
            transclude: true,
            controllerAs: 'ctrl',
            bindToController: true,
            template: require('./requests.html!text'),
            controller: require('./requests.ctrl')
        }
    });
