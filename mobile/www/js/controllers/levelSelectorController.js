angular.module('starter.controllers.LevelSelectorController', [])
.controller( 'LevelSelectorController', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $scope.level = 1;
  $scope.$on('userLoggedIn', function () {
    $scope.level = $rootScope.user.level;
  });
  $rootScope.$on('correctMatch', function () {
    $scope.level = $rootScope.user.level;
  })
}])