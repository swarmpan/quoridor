"use strict";
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongo = require('./modules/mongo');
var session = require('express-session');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('jade', require('jade').__express);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// définition du dossier public
app.use(express.static(path.join(__dirname, 'public')));

// Use the session middleware
app.use(session({
	secret: 'yee', 
	resave: true,
  	saveUninitialized: true, 
  	cookie: { maxAge: 3600000 } // 1 heure
}));

// Routes
app.use('/', require('./routes/index'));

app.use('/create', require('./routes/create')(mongo.models));
app.use('/signup', require('./routes/signup')(mongo.models));
app.use('/login', require('./routes/login')(mongo.models));
app.use('/leave', require('./routes/leave')(mongo.models));
app.use('/logout', require('./routes/logout'));

app.use('/isConnected', function(req, res, next) {
	if (req.session.connected) {
		res.json({
			connected: true,
			email: req.session.email,
			pseudo: req.session.pseudo
		});
	} else
		res.json({connected: false});
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	console.log("Development");
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('404.html', {
			message: err.message,
			error: err
		});
	});
}
else {
	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('404.html', {
			message: err.message,
			error: {}
		});
	});
}

module.exports = app;
