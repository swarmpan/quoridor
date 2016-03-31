function Dashboard() {
	this.dashboardDiv = $("#dashboard");
	this.attachListeners();
}


Dashboard.prototype.slideDown = function(email) {
	this.dashboardDiv.slideDown();

	$("#nav-login-info").fadeIn();
	$("#nav-email").text(email);
};


Dashboard.prototype.slideUp = function(callback) {
	this.dashboardDiv.slideUp(callback);
};


Dashboard.prototype.attachListeners = function() {
	$("#button-logout").click(this.logout);
	$("#create-form").submit(this.createGame);
};


Dashboard.prototype.logout = function(event) {
	$.ajax({
		method: "post",
		url: "logout"
	})
	.done(function(data) {
		if(data.success) {
			$("#nav-login-info").fadeOut();
			dashboard.slideUp(function() {
				index.slideDown();
			});
		}
		else
			displayAlert("danger", data.message);
	});
};

Dashboard.prototype.createGame = function(event) {
	$.ajax({
		method: $(this).attr("method"),
		url: $(this).attr("action"),
		data: $(this).serialize(),
	})
	.done(function(data) {
		if (data.success) {
			console.log(data);
			dashboard.slideUp();
			game.slideDown();
			game.init(data);
		}
	});

	return false;
};