var express = require('express');
var router = express.Router();

module.exports = function(models) {

	router.post('/', function(req, res, next) {
		models.Game.findOne({ id: req.body.id })
			.exec(function(err, result) {
				if (err) console.log(err);

				console.log(result);
			});

		res.json({
			success: true
		});
	});

	return router;
};