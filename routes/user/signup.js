var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var mailer = require('nodemailer');

var transport = mailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'spamswarm6@gmail.com',
		pass: 'chopperman'
	}
});

// Vérifie que le serveur SMTP fonctionne
transport.verify(function(error, success) {
	if (error) {
		console.log(error);
	} else {
		console.log('Server SMTP ready');
	}
});



function sendErrorMessage(res, message) {
	res.json({
		success: false,
		message: message
	});
}


module.exports = function(models) {

	router.post('/', function(req, res, next) {
		var data = req.body;

		if (data.password != data.repassword) {
			sendErrorMessage(res, "Les mots de passe ne correspondent pas")
			return;
		}

		// Vérifie si un utilisateur possède déjà cet email
		models.User.count({email: data.email}, function(err, count) {
			if (err) console.error(err);
			
			// Si l'email existe déjà, erreur
			if (count > 0) {
				sendErrorMessage(res, "Un compte avec cet email existe déjà");
				return;
			}

		  	var user = new models.User({
		  		email: data.email,
		  		pseudo: data.pseudo,
		  		// Encode le mot de passe en md5
		  		password: crypto.createHash('md5').update(data.password).digest("hex")
		  	});

		  	user.save(function(err) {
		  		if (err) return console.error(err);
				console.log("New user created :");
				console.log(data);
		  	});


		  	transport.sendMail({
		  		from: "spamswarm2@gmail.com",
		  		to: data.email,
		  		subject: "Quoridor - Inscription",
		  		text: "Votre inscription a été validée ! Bienvenue " + data.pseudo
		  	}, function(err, info) {
		  		if (err) return console.error(err);
		  		else {
		  			console.log("Email envoyé");
		  			console.log(info);
		  		}
		  	});
			
			res.json({
				success: true,
				action: "signup",
				email: data.email
			});
		});
	});

	return router;
};