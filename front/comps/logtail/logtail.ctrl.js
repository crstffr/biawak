
module.exports = LogtailCtrl;

LogtailCtrl.$inject = ['$scope'];

function LogtailCtrl($scope) {

    this.items = $scope.items;

    console.log(this);

}
