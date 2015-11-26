
module.exports = DigestService;

DigestService.$inject = ['$rootScope'];

function DigestService($rootScope) {

    this.force = function(fn) {
        $rootScope.$applyAsync(fn);
    }

}
