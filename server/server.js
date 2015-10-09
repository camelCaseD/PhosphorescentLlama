var express = require('express');

var paths = require('../paths.js');

var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');

var passport = require('passport');

var expressSession = require('express-session');

var initPassport = require('./passport/init');

var router = require( paths.routers + '/routes.js' );

var mongoose = require('mongoose');

var port = process.env.PORT || 44100;

var connectURI;

if( process.env.PORT ) {

  connectURI = process.env.DATABASE_URL;

} else {

  connectURI = 'mongodb://localhost/ngtzit';

}

mongoose.connect( connectURI );


var app = express();

app.use(function(req, res, next) {
  
  res.set( {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
    'Access-Control-Expose-Headers': 'lastLevel, username, level',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' 
  } );

  next();

});

app.use( bodyParser.urlencoded({extended: true}) );

app.use( bodyParser.json() );

app.use( cookieParser() );

app.use(

  expressSession( {

    secret: 'beef sucks, don`t eat it.',

    resave: false,

    saveUninitialized: false

  })

);

app.use( passport.initialize() );

app.use( passport.session() );

// { maxAge: new Date(Date.now() + 3600000) })

initPassport( passport );


var routes = require('./routers/routes.js')(passport);

app.use('/', routes);

/// catch 404 and forward to error handler

app.use( function( request, response, next ) {

  var error = new Error('Not Found');

  error.status = 404;

  next( error );

});

app.listen( port );

console.log( 'Ngtzit app listening on port: 44100' );

module.exports = app;
