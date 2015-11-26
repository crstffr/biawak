var angular = require('angular');

require('./logtail.css!');

module.exports = angular.module('logtail', [])
    .directive('logtail', function () {
        return {
            scope: {
                items: '='
            },
            restrict: 'E',
            transclude: true,
            controllerAs: 'ctrl',
            template: require('./logtail.html!text'),
            controller: require('./logtail.ctrl')
        }
    });
