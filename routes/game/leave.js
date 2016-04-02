var express = require('express');
var router = express.Router();

module.exports = function(models) {

	router.post('/', function(req, res, next) {
		// Leave game

	  	// Set la partie associée a l'utilisateur
	  	models.User.findOneAndUpdate({ email: req.session.email },
	  	{ 
	  		game: ""
	  	},
	 	function(err, result) {
			if (err) {
				res.json({
					success: false,
					message: err
				});
				return console.error(err);
			}

			models.Game.findOneAndRemove({ id: result.game },
				function(err, result) {
					if (err) {
						res.json({
							success: false,
							message: err
						});
						return console.error(err);
					}

					res.json({
						success: true,
					});
				}
			);
	 	});
	});

	return router;
};