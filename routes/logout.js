var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
	req.session.destroy(function(err) {
		if (err)
			console.log(err);
		else
			console.log("Session détruite");
	});

	res.json({
		success: true,
		action: "logout",
	});
});

module.exports = router;