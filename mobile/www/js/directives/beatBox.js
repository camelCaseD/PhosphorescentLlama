angular.module('starter.directives.beatBox', [])

.directive('beatBox', function ( ) {

  return {

    templateUrl: 'templates/beat-box.html',

    replace: true,

    restrict: 'E'

  };

});
