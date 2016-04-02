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
	$("#list-button").click(this.refreshGameList);
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

Dashboard.prototype.displayNoGameMessage = function() {
	$("#gameList table").hide();
	$("#gameList .error-message").show();
};

Dashboard.prototype.refreshGameList = function() {
	$.ajax({
		method: "get",
		url: "gameList"
	})
	.done(function(data) {
		if (data.success) {
			console.log("Liste partie actualisée !");
			if (data.list.length == 0)
				dashboard.displayNoGameMessage();

			dashboard.gameList = data.list;
			dashboard.appendList();
		}
	});
};

Dashboard.prototype.appendList = function() {
	var table = $("#gameTable").empty();

	for (entry in this.gameList) {
		var gameName = $('<td/>')
			.text(this.gameList[entry].name);

		var gameCreator = $("<td/>")
			.text(this.gameList[entry].player1);

		var joinButton = $('<button class="btn btn-primary"/>')
			.val(this.gameList[entry].id)
			.click(function(event) {
				dashboard.onGameClick($(this).val());
			});

		var tr = $("<tr/>")
			.append(gameName)
			.append(gameCreator)
			.append($('<td/>').append(joinButton));

		table.prepend(tr);
	}
};

Dashboard.prototype.onGameClick = function(id) {
	$.ajax({
		method: "post",
		url: "join",
		data: {
			id: id
		}
	})
	.done(function(data) {
		if (data.success) {
			console.log("Joined game " + data.gameData.id);
			game.init(data.gameData);
			dashboard.slideUp();
			game.slideDown();
		}
	});
};