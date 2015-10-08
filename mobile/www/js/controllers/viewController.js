angular.module('starter.controllers.ViewController', [])

.controller( 'ViewController', [ '$scope', '$timeout', '$rootScope', function ( $scope, $timeout, $rootScope ) {

	$scope.wrong = false;

	$scope.won = false;

	$scope.match = false;

	$scope.declareWrong = function ( ) {

		$scope.wrong = true;

		$timeout( function ( ) {

			$scope.wrong = false;

		}, 500);

	};

	$scope.declareMatch = function ( ) {

		$scope.match = true;

		$timeout( function ( ) {

			$scope.match = false;

		}, 500);

	};

	$scope.restartGame = function ( ) {

		$rootScope.$broadcast('restartGame');

		$scope.won = false;

	};

	$rootScope.$on( 'correctMatch', function ( ) {

		$scope.declareMatch( );

	});

	$rootScope.$on( 'notAMatch', function ( ) {

		$scope.declareWrong( );

	});

	$rootScope.$on( 'playerWon' , function ( ) {

		$scope.won = true;

	});



}]);
