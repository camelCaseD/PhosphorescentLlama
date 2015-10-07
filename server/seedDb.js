var Sequencer = require('./models/sequencerModel.js');
var mongoose = require('mongoose');

if( process.env.PORT ) {

  connectURI = process.env.DATABASE_URL;

} else {

  connectURI = 'mongodb://localhost/ngtzit';

}

mongoose.connect( connectURI );

var seedDb = function ( ) {
  var level;
  //loop through the levels
  for ( var i = 0; i < levels.length; i++ ) {
    
    level = levels [ i ];
    
    //check level format
    if ( (level.data.tickNumber !== 4) && (level.data.tickNumber !== 8) && (level.data.tickNumber !== 16) ) {

      throw level.data.tickNumber + "is an invalid tickNumber on level " + (i+1);

    }
    
    if ( level.data.sequences.kick && level.data.sequences.kick.length !== level.data.tickNumber ) {

      throw "Kick must have an 'isOn' value for each beat in tickNumber";

    }

    if ( level.data.sequences.lowTom && level.data.sequences.lowTom.length !== level.data.tickNumber ) {

      throw "LowTom must have an 'isOn' value for each beat in tickNumber";

    }

    if ( level.data.sequences.clap && level.data.sequences.clap.length !== level.data.tickNumber ) {

      throw "Clap must have an 'isOn' value for each beat in tickNumber";

    }

    var sequencer = new Sequencer( );

    //add level property from 1- number of levels
    sequencer.level  = i + 1;

    sequencer.data = JSON.stringify( level.data );

    // add to db
    Sequencer.findOne( { level: sequencer.level }, function( err, found ) {

      if ( err ) {

        throw error;

      } else {

        sequencer.save(function( error ){

          if ( error ) {

            throw error;

          }
          console.log('Saving level');

        });

      }
    
    });

  }

};

// data format
// level property must be added, tick number must 4/8/16 and must be the same as sequences[sound].length
var levels = [
  {
    //level : integer,
    data: {
      "tempo":"1200",
      "tickNumber":4,
      "soundIDs":["kick","clap"],
      "sequences":{
        "kick":[
          {"isOn":true},
          {"isOn":false},
          {"isOn":false},
          {"isOn":true}
        ],
        "clap":[
          {"isOn":false},
          {"isOn":false},
          {"isOn":true},
          {"isOn":false}
        ]
      }
    }
  },
  {
    data: {
      "tempo":"1200",
      "tickNumber":8,
      "soundIDs":["kick","clap"],
      "sequences":{
        "kick":[
          {"isOn":true},
          {"isOn":false},
          {"isOn":false},
          {"isOn":false},
          {"isOn":true},
          {"isOn":true},
          {"isOn":true},
          {"isOn":false}
        ],
        "clap":[
          {"isOn":false},
          {"isOn":false},
          {"isOn":true},
          {"isOn":true},
          {"isOn":false},
          {"isOn":false},
          {"isOn":false},
          {"isOn":false}
        ]
      }
    }
  }
];

console.log('seeding DB');
seedDb();