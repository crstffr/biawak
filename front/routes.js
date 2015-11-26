module.exports = Routes;

Routes.$inject = [
    '$stateProvider',
    '$locationProvider'
];

function Routes($stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
        .state(require('./routes/index.route'))
        .state(require('./routes/stream/stream.route'))

}
