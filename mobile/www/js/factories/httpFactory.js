angular.module('starter.services.http', [])

.factory( 'httpFactory', [ '$http', function ( $http ) {
  var url = 'https://ar-ngtzit.herokuapp.com';
  // var url = 'http://127.0.0.1:44100';

  //Sends request to server and retrieves sequencer for given level
  var requests = {};

  requests.getSequencer = function ( level, callback ) {

    return $http.get( url + '/levels/' + level.toString( ) )

      .then( function( response ) {

        if( callback ) {

          callback( response );
          
        }

      });

  };

  requests.postSequencer = function ( level, stringifiedSequencer, callback ) {

    return $http.post( url + '/levels/', { level: level, data: stringifiedSequencer } )

      .then( function ( response ) {

        if( callback ) {

          callback( response );
          
        }

      });

  };

  requests.putSequencer = function ( level, stringifiedSequencer, callback ) {

    return $http.put( url + '/levels/', { level: level, data: stringifiedSequencer } )

      .then( function ( response ) {

        if( callback ) {

          callback( response );

        }

      });

  };

  requests.loginUser = function ( user, callback ) {

    return $http.post( url + '/login', { username: user.username, password: user.password } )

      .then( function ( response ) {

        if ( callback ) {

          callback( response );

        }

      });

  };

  requests.signupUser = function ( user, callback ) {

    return $http.post( url + '/signup', { username: user.username, password: user.password } )

      .then( function ( response ) {

        if ( callback ) {

          callback( response );

        }

      });

  };

  //TERRIBLY NAMED - THIS UPDATES A USER'S BEST LEVEL, NOT THE LEVEL ITSELF
  requests.updateLevel = function ( user, callback ) {

    return $http.put( url + '/users', { username: user.username, level: user.level } )

      .then( function ( response ) {

        if ( callback ) {

          callback( response );

        }

      });

  };

  requests.getUser = function ( callback ) {

    return $http.get( url + '/users' )

      .then( function ( response ) {

        if( callback ) {

          callback( response );

        }

      });

  };

  requests.logout = function ( callback ) {

    return $http.post( url + '/logout' )

      .then( function ( response ) {

        if ( callback ) {

          callback( response );

        }

    });

  };

  return requests;

}]);
