var express = require('express');
var router = express.Router();

module.exports = function(models) {

	router.post('/', function(req, res, next) {
		// Leave game

		res.json({
			success: true
		});
	});

	return router;
};