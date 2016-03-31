var express = require('express');
var router = express.Router();

module.exports = function(models) {

	router.post('/', function(req, res, next) {
		var email = req.session.email;
		var pseudo = req.session.pseudo;

	  	var newGame = new models.Game({
	  		name: req.body.roomName,
	  		player1: req.session.email,
	  		position1: "top",
	  		position2: "bottom",
	  		walls: [],
	  		wall1: 10,
	  		wall2: 10,
	  		turn: 0,
	  		waiting: true
	  	});

	  	newGame.save(function(err) {
	  		if (err) return console.error(err);
	  	});

	  	console.log("New game created !");
		res.json({
			success: true,
			email: req.session.email,
			pseudo: req.session.pseudo,
			position: "top"
		});
	});

	return router;
};