var self;

function Index() {
	self = this;
	this.indexDiv = $("#index");
	this.pseudo = $("#pseudo");
	this.password = $("#password");
	this.repassword = $("#repassword");
	this.attachListeners();
}


Index.prototype.slideUp = function(callback) {
	this.indexDiv.slideUp(callback);
};


Index.prototype.slideDown = function() {
	this.indexDiv.slideDown();
};


Index.prototype.hide = function(callback) {
	this.indexDiv.hide(callback);
};


Index.prototype.attachListeners = function() {
	$("#submit-form").submit(this.onSubmit);

	$("#login-tab").on("shown.bs.tab", this.showLoginTab);
	$("#signup-tab").on("shown.bs.tab", this.showSignupTab);
};


Index.prototype.onSubmit = function(event) {
	// Si le formulaire d'inscription est invalide
	// on retourne sans envoyer l'ajax
	if ($(this).attr("action") == "signup" && 
		! this.signupFormValid()) {
		return false;
	}

	$.ajax({
		method: $(this).attr("method"),
		url: $(this).attr("action"),
		data: $(this).serialize(),
	})
	.done(function(data) {
		if(data.success) {
			if (data.action == "login")
				index.onLoginSuccess(data);

			else if (data.action == "signup")
				index.onSignupSuccess(data);

			else
				displayAlert("danger", "Erreur de réponse du serveur");
		}
		else {
			displayAlert("danger", data.message);
		}
	});

	return false;
};


Index.prototype.showLoginTab = function() {
	self.pseudo.hide();
	self.repassword.hide();
	$("#button-signup").hide();
	$("#button-login").show();

	// Enleve l'affichage de la tooltip sur le mot de passe
	self.password.unbind();

	$("#submit-form").attr("action", "login");
};


Index.prototype.showSignupTab = function() {
	self.pseudo.show()
		.focus(function() {
			$(this).tooltip('show');
		});

	self.repassword.show();
	$("#button-signup").show();
	$("#button-login").hide();

	self.password.focus(function() {
		$(this).tooltip('show');
	});

	$("#submit-form").attr("action", "signup");
};


Index.prototype.onSignupSuccess = function(data) {
	displayAlert("success", "<strong>Inscription réussie !</strong> " +
		"Un mail de confirmation vous a été envoyé à " + data.email);

	$("#button-signup").prop("disabled", true);
};


Index.prototype.onLoginSuccess = function(data) {
	this.slideUp(function() {
		dashboard.slideDown(data.email);
	});
};


Index.prototype.signupFormValid = function() {
	if (this.password.val() !== this.repassword.val()) {
		displayAlert("danger", "Les mots de passe ne correspondent pas");
		return false;
	}
	else if (this.password.val().length < 3) {
		displayAlert("danger", "Le mot de passe est trop court");
		return false;
	}
	else if (this.pseudo.val().length < 3) {
		displayAlert("danger", "Le pseudo est trop court");
		return false;
	}
	return true;
};