var express = require('express');
var router = express.Router();
var shortid = require('shortid');

module.exports = function(models) {

	router.post('/', function(req, res, next) {
		var email = req.session.email;
		var pseudo = req.session.pseudo;
		var id = shortid.generate();

	  	var newGame = new models.Game({
	  		id: id,
	  		name: req.body.roomName,
	  		player1: req.session.pseudo,
	  		position1: {x: 4, y: 0},
	  		position2: {x: 4, y: 8},
	  		walls: [],
	  		wall1: 10,
	  		wall2: 10,
	  		turn: 0,
	  		waiting: true
	  	});

	  	newGame.save(function(err) {
	  		if (err) return console.error(err);
	  	});

	  	// Set la partie associée a l'utilisateur
	  	models.User.findOneAndUpdate({ email: email },
	  	{
	  		game: id
	  	},
	 	function(err, result) {
	 		if (err) return console.error(err);
	 	});

	  	console.log("New game created !");
		res.json({
			success: true,
			gameData: newGame,
			position: newGame.position1,
			walls: newGame.wall1
		});
	});

	return router;
};