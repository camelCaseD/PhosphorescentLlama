var Sequencer = require('./models/sequencerModel.js');
var mongoose = require('mongoose');

if( process.env.PORT ) {

  connectURI = process.env.DATABASE_URL;

} else {

  connectURI = 'mongodb://localhost/ngtzit';

}

mongoose.connect( connectURI );

var seedDb = function ( ) {
  var level, sequencers = [];

  //loop through the levels
  for ( var i = 0; i < levels.length; i++ ) {
    
    level = levels[i];
    
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

    level.data = JSON.stringify( level.data );

    sequencers.push(level);

  }

  // add to db
  return Sequencer.remove({}, function ( ){

    console.log( 'Levels Deleted' );

    Sequencer.collection.insert(sequencers, function ( error, result ) {

      if ( error ) {

        throw error;

      } else {

        console.log(result.insertedCount + " levels inserted");

      }

    });

  });


};

// data format
// level property must be added, tick number must 4/8/16 and must be the same as sequences[sound].length
var levels = [
  {
    level : 1,
    data: {
      "tempo":"120",
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
    data:JSON.parse("{\"tempo\":\"120\",\"tickNumber\":4,\"soundIDs\":[\"kick\"],\"sequences\":{\"kick\":[{\"isOn\":true},{\"isOn\":true},{\"isOn\":false},{\"isOn\":true}]}}"),
    level:2
  },
  {
    data:JSON.parse("{\"tempo\":\"120\",\"tickNumber\":4,\"soundIDs\":[\"kick\"],\"sequences\":{\"kick\":[{\"isOn\":true},{\"isOn\":false},{\"isOn\":true},{\"isOn\":false}]}}"),
    level:3
  },
  {
    data:JSON.parse("{\"tempo\":\"120\",\"tickNumber\":4,\"soundIDs\":[\"kick\",\"lowTom\"],\"sequences\":{\"kick\":[{\"isOn\":true},{\"isOn\":false},{\"isOn\":true},{\"isOn\":false}],\"lowTom\":[{\"isOn\":false},{\"isOn\":false},{\"isOn\":false},{\"isOn\":true}]}}"),
    level:4
  },
  {
    data:JSON.parse("{\"tempo\":\"240\",\"tickNumber\":8,\"soundIDs\":[\"kick\",\"lowTom\"],\"sequences\":{\"kick\":[{\"isOn\":true},{\"isOn\":false},{\"isOn\":false},{\"isOn\":false},{\"isOn\":true},{\"isOn\":false},{\"isOn\":false},{\"isOn\":false}],\"lowTom\":[{\"isOn\":false},{\"isOn\":true},{\"isOn\":false},{\"isOn\":false},{\"isOn\":false},{\"isOn\":false},{\"isOn\":true},{\"isOn\":false}]}}"),
    level:5
  },
  {
    data:JSON.parse("{\"tempo\":\"240\",\"tickNumber\":8,\"soundIDs\":[\"kick\",\"lowTom\"],\"sequences\":{\"kick\":[{\"isOn\":true},{\"isOn\":true},{\"isOn\":false},{\"isOn\":false},{\"isOn\":true},{\"isOn\":true},{\"isOn\":false},{\"isOn\":false}],\"lowTom\":[{\"isOn\":false},{\"isOn\":false},{\"isOn\":true},{\"isOn\":false},{\"isOn\":false},{\"isOn\":false},{\"isOn\":false},{\"isOn\":true}]}}"),
    level:6
  },
  {
    data:JSON.parse("{\"tempo\":\"240\",\"tickNumber\":8,\"soundIDs\":[\"kick\",\"lowTom\",\"clap\"],\"sequences\":{\"kick\":[{\"isOn\":true},{\"isOn\":false},{\"isOn\":false},{\"isOn\":false},{\"isOn\":false},{\"isOn\":true},{\"isOn\":false},{\"isOn\":false}],\"lowTom\":[{\"isOn\":false},{\"isOn\":false},{\"isOn\":true},{\"isOn\":false},{\"isOn\":false},{\"isOn\":false},{\"isOn\":false},{\"isOn\":true}],\"clap\":[{\"isOn\":false},{\"isOn\":false},{\"isOn\":false},{\"isOn\":true},{\"isOn\":false},{\"isOn\":false},{\"isOn\":true},{\"isOn\":false}]}}"),
    level:7
  },
  {
    data:JSON.parse("{\"tempo\":\"240\",\"tickNumber\":8,\"soundIDs\":[\"kick\",\"lowTom\",\"clap\"],\"sequences\":{\"kick\":[{\"isOn\":true},{\"isOn\":false},{\"isOn\":false},{\"isOn\":false},{\"isOn\":true},{\"isOn\":false},{\"isOn\":false},{\"isOn\":false}],\"lowTom\":[{\"isOn\":false},{\"isOn\":false},{\"isOn\":true},{\"isOn\":false},{\"isOn\":false},{\"isOn\":false},{\"isOn\":false},{\"isOn\":true}],\"clap\":[{\"isOn\":false},{\"isOn\":false},{\"isOn\":false},{\"isOn\":true},{\"isOn\":false},{\"isOn\":true},{\"isOn\":true},{\"isOn\":false}]}}"),
    level:8
  },
  {
    data:JSON.parse("{\"tempo\":\"240\",\"tickNumber\":8,\"soundIDs\":[\"kick\",\"lowTom\",\"clap\"],\"sequences\":{\"kick\":[{\"isOn\":false},{\"isOn\":false},{\"isOn\":false},{\"isOn\":false},{\"isOn\":false},{\"isOn\":false},{\"isOn\":true},{\"isOn\":false}],\"lowTom\":[{\"isOn\":false},{\"isOn\":true},{\"isOn\":false},{\"isOn\":true},{\"isOn\":false},{\"isOn\":true},{\"isOn\":false},{\"isOn\":false}],\"clap\":[{\"isOn\":true},{\"isOn\":false},{\"isOn\":true},{\"isOn\":false},{\"isOn\":true},{\"isOn\":false},{\"isOn\":false},{\"isOn\":false}]}}"),
    level:9
  },
  {
    data:JSON.parse("{\"tempo\":\"240\",\"tickNumber\":8,\"soundIDs\":[\"kick\",\"lowTom\",\"clap\"],\"sequences\":{\"kick\":[{\"isOn\":true},{\"isOn\":false},{\"isOn\":false},{\"isOn\":false},{\"isOn\":false},{\"isOn\":true},{\"isOn\":false},{\"isOn\":false}],\"lowTom\":[{\"isOn\":false},{\"isOn\":false},{\"isOn\":false},{\"isOn\":true},{\"isOn\":false},{\"isOn\":false},{\"isOn\":false},{\"isOn\":true}],\"clap\":[{\"isOn\":false},{\"isOn\":false},{\"isOn\":true},{\"isOn\":false},{\"isOn\":true},{\"isOn\":false},{\"isOn\":false},{\"isOn\":true}]}}"),
    level:10
  }
];

console.log('seeding DB');
seedDb();