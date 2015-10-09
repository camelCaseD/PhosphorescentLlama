angular.module('starter.controllers.LevelSelectorController', [])
.controller( 'LevelSelectorController', ['$scope', '$rootScope', function ($scope, $rootScope) {

  $scope.level = 1;

  $scope.selectPreviousLevel = function () {

    if( $scope.level-- === 1 ) {

      $scope.level = $scope.lastLevel;

    }

    $rootScope.$broadcast('changeLevel', $scope.level);

  };

  $scope.selectNextLevel = function () {

    if( $scope.level++ === $scope.lastLevel ) {

      $scope.level = 1;

    }

    $rootScope.$broadcast('changeLevel', $scope.level);

  };

  $scope.$on('userLoggedIn', function () {

    $scope.level = $rootScope.user.level;

  });

  $rootScope.$on('correctMatch', function () {

    $scope.level = $rootScope.user.level;

  });

}]);