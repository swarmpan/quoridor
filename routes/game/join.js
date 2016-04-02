var express = require('express');
var router = express.Router();

module.exports = function(models) {

	router.post('/', function(req, res, next) {
		models.Game.findOneAndUpdate({ id: req.body.id },
			{
				player2: req.session.pseudo,
				waiting: false
			},
			function(err, result) {
				if (err) {
					console.log(err);
					res.json({
						success: false,
						message: err.message
					});
					return;
				}

			  	// Set la partie associée a l'utilisateur
			  	models.User.findOneAndUpdate({ email: req.session.email },
			  	{
			  		game: id
			  	},
			 	function(err, result) {
			 		if (err) return console.err.bind(err);
			 	});

				console.log("Result: ", result);
				res.json({
					success: true,
					gameData: result,
					position: result.position2,
					walls: result.wall2
				});
			}
		);
	});

	return router;
};