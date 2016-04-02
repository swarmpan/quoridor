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
				
				console.log("Result: ", result);
				res.json({
					success: true,
					gameData: result
				});
			});
	});

	return router;
};