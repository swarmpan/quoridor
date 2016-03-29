var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var session = require('express-session');

var CONNECT_DELAY = 3000;


function sendErrorMessage(res, message) {
	res.json({
		success: false,
		message: message
	});
}

function hashPassword(hash, pass) {
	return crypto.createHash(hash).update(pass).digest("hex");
}



module.exports = function(models) {

	router.post('/', function(req, res, next) {
		var data = req.body;

		models.User.findOne({ email: data.email }, function(err, result) {
			console.log(result);
			if (result === null) {
				sendErrorMessage(res, "Aucun utilisateur enregistré avec cet email");
				return;
			}

			var hashedPass = hashPassword("md5", data.password);

			if (hashedPass === result.password) {
				console.log("Successful login from " + data.email);

				// Set session variables
				req.session.connected = true;
				req.session.email = result.email;
				req.session.pseudo = result.pseudo;

				res.json({
					success: true,
					action: "login",
					email: result.email,
					pseudo: result.pseudo
				});
			}
			else {
				console.log("Failed login from " + data.email + " : Wrong password");
				sendErrorMessage(res, "Mot de passe erroné");
			}
		});
	});

	return router;
};