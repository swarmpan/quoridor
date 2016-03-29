function displayAlert(type, message) {
	var message = message;
	if (type == "danger")
		message = '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> ' + message;

	var alert = $('<div class="alert"/>')
		.addClass("alert-" + type)
		.append(message)
		.css("display", "none");

	$("#message-box").empty()
		.append(alert);

	alert.fadeIn("fast", function() {
		$(this).delay(4000).fadeOut("fast", function() {
			$(this).remove();
		});
	});
}


function isFormSignupValid(pseudo, password, repassword) {
	if (password.val() !== repassword.val()) {
		displayAlert("danger", "Les mots de passe ne correspondent pas");
		return false;
	}
	else if (password.val().length < 3) {
		displayAlert("danger", "Le mot de passe est trop court");
		return false;
	}
	else if (pseudo.val().length < 3) {
		displayAlert("danger", "Le pseudo est trop court");
		return false;
	}
	return true;
}