app.controller( 'GameController' , [ '$scope', 'playerSequencer', 'httpFactory', 'initialize', 'levelFactory', '$rootScope', '$timeout', function ( $scope, playerSequencer, httpFactory, initialize, levelFactory, $rootScope, $timeout ) {

  /////////////////
  //
  //
  // SETTINGS
  //
  //
  /////////////////
  if ( $rootScope.user ) {

    $scope.level = $rootScope.user.level;

  } else {

    $scope.level = 1;

  }

  /////////////////
  //
  //
  // FUNCTIONS
  //
  //
  /////////////////

  $scope.playerSequencerPlayToggle = function ( ) {

    $scope.$broadcast( 'playToggle' );

  };

  //makes call to server and passes sequencer data to the target sequencer controller
  $scope.getSequencer = function ( ) {

    httpFactory.getSequencer( $scope.level, function ( data ) {

      $scope.$broadcast( 'createTargetSequencer', data );

    });

  };


  //should play target sequencer twice, then hand control over to player
  $scope.startLevel = function ( ) {

    //call initialization function to set audio context on the window
    //which must exist before the sequencers are made

    $scope.buildLevel( );

  };

  //when player submits their sequencer pattern, check if it matches target sequencer
  //if so, trigger end of level events
  //else, give feedback and wait for next submission
  $scope.submit = function ( ) {

    $scope.playerSequencer.stop( );

    $scope.targetSequencer.stop( );

    if ( $scope.playerSequencer.match( $scope.targetSequencer ) ) {

      $scope.playerWon( );

    } else {

      $scope.failedMatch( );

    }

  };

  $scope.declareWrong = function ( ) {

    $scope.wrong = true;

    $timeout( function() { $scope.wrong = false; }, 300 );

  };

  $scope.playerWon = function ( ) {

    $scope.$emit( 'correctMatch' );

    $scope.level++;

    if( $rootScope.user ) {

      $rootScope.user.level = $scope.level;

      httpFactory.updateLevel( $rootScope.user );

    }


    $scope.startLevel( );

  };

  $scope.failedMatch = function ( ) {

    $scope.$emit( 'notAMatch' );

    $scope.removeWrongBeats( );

  };

  $scope.removeWrongBeats = function ( ) {

    var wrongBeats = $scope.playerSequencer.getWrongBeats( $scope.targetSequencer );

    $scope.$broadcast( 'toggleWrongBeatsOff', wrongBeats );

  };

  $scope.buildLevel = function ( ) {

    var levelSettings = levelFactory[ $scope.level ];

    var levelSequencer = new Sequencer (

      levelSettings.tempo,

      levelSettings.tickNumber,

      levelSettings.soundIDs

    );

    for( var i = 0; i < levelSettings.beatsToToggle.length; i++ ) {

      var sequenceIndex = levelSettings.beatsToToggle[ i ][ 0 ];

      var beatIndex = levelSettings.beatsToToggle[ i ][ 1 ];

      levelSequencer.toggleBeat( sequenceIndex, beatIndex );

    }

    var savedSequencer = levelSequencer.save( );

    httpFactory.postSequencer( $scope.level, savedSequencer, $scope.getSequencer );

  };


  /////////////////
  //
  //
  // EVENT HANDLERS
  //
  //
  /////////////////

  //when target sequencer is created, set pointer to TS as property of game controller
  //then pass that to the player sequencer controller
  $scope.$on( 'madeTargetSequencer', function ( event, targetSequencer ) {

    $scope.targetSequencer = targetSequencer;

    //I feel like this should live in a difference place
    $scope.$broadcast( 'playTwice' );

    $scope.$broadcast( 'createPlayerSequencer', $scope.targetSequencer );

  });

  //when player sequencer is created, set pointer to PS as property of game controller
  $scope.$on( 'madePlayerSequencer', function ( event, playerSequencer ) {

    $scope.playerSequencer = playerSequencer;

  });

  //makes playing sequencers mutually exclusive
  $scope.$on( 'targetSequencerPlaying', function ( ) {

    $scope.$broadcast( 'playerStopPlaying' );

  });

  //makes playing sequencers mutually exclusive
  $scope.$on( 'playerSequencerPlaying', function ( ) {

    $scope.$broadcast( 'targetStopPlaying' );

  });

  $scope.$on( 'submitMatch', function ( ) {

    $scope.submit( );

  });

  ////////////////////
  //
  //
  // INITIALIZATION
  //
  //
  ////////////////////

  // $scope.startLevel( );

  initialize( $scope.startLevel );


  //BELOW HERE ARE ALL TEMPORARY FUNCTIONS THAT WON'T BE NEEDED ONCE WE ARE RETRIEVING SOUNDS PROPERLY
  $scope.saveToDatabase = function( ) {

    var savedSequencer = $scope.playerSequencer.save( );

    playerSequencer.store( $scope.inputLevel, savedSequencer, function( response ) {

      if ( response ) {

        $scope.inputLevel = '';

      }

    });

  };

  $scope.createSequencer = function( ) {

    var soundIDs = [ 'kick', 'clap', 'hihat' ];

    var userSequencer = playerSequencer.build( $scope.inputTempo, $scope.inputBeats, soundIDs );

    $scope.$broadcast( 'createPlayerSequencer', userSequencer );

    $scope.inputTempo = '';

    $scope.inputBeats = '';

    $scope.inputSounds = '';

  };

}]);
