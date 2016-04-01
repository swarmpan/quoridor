function Dashboard() {
	this.dashboardDiv = $("#dashboard");
	this.attachListeners();
}

Dashboard.prototype.init = function(email, pseudo) {
	$("#nav-email").text(email);
	$("#display-pseudo").text(pseudo);
	this.refreshGameList();
};

Dashboard.prototype.slideDown = function() {
	$("#nav-login-info").fadeIn();

	this.dashboardDiv.slideDown();
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
	// Il faut spécifier un nom de partie
	if ($("#room-name").val().length == 0) {
		$("#room-name").tooltip("show");
		return false;
	}

	$.ajax({
		method: $(this).attr("method"),
		url: $(this).attr("action"),
		data: $(this).serialize(),
	})
	.done(function(data) {
		if (data.success) {
			console.log(data);
			dashboard.slideUp();
			game.init(data);
			game.slideDown();
		}
	});

	return false;
};

Dashboard.prototype.refreshGameList = function() {
	$.ajax({
		method: "get",
		url: "gameList"
	})
	.done(function(data) {
		if (data.success) {
			dashboard.gameList = data.list;
			dashboard.appendList();
		}
	});
};

Dashboard.prototype.appendList = function() {
	$("#gameList").empty();
	console.log(this.gameList);
	for (jizon in this.gameList) {
		var entry = $("<a/>")
			.text(this.gameList[jizon].name)
			.click(function(event) {
				$.ajax({
					method: "post",
					url: "join",
					data: {
						id: dashboard.gameList[jizon].id
					}
				})
				.done(function(data) {
					if (data.success) {
						game.init(data);
						dashboard.slideUp();
						game.slideDown();
					}
				});
			});
		$("#gameList").append(entry)
			.append("<br/>");
	}
};