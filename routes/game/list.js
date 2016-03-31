var express = require('express');
var router = express.Router();


module.exports = function(models) {

	router.get('/', function(req, res, next) {
		models.Game.find({ waiting: true })
			.select("name player1")
			.exec(function(err, result) {
				if (err) {
					console.log(err);
					res.json({
						success: false,
						message: err.message
					});
					return;
				}

				res.json({
					success: true,
					list: result
				});
			});
	});

	return router;
};