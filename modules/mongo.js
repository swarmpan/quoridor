var mongoose = require('mongoose');

var USERNAME = "test";
var PASSWORD = "pdsuss2";

mongoose.connect('mongodb://'+ USERNAME +':'+ PASSWORD +'@ds013619.mlab.com:13619/testquoridor');

var db = mongoose.connection;
db.on('error', function(err) {
	console.log(err);
});

var models = require('./models');

db.once('open', function() {
  	console.log("Connected to database");
});

module.exports.db = db;
module.exports.models = models;