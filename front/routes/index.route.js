module.exports = {
    url: '/',
    name: 'index',
    onEnter: ['$state', function($state) {
        $state.go('stream');
    }]
};
