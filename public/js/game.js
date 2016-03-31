function Game() {
	this.gameDiv = $("#game");
	this.attachListeners();
	this.gameList = {};
	this.refreshDeferred = $.Deferred();
}

Game.prototype.show = function() {
	this.gameDiv.slideDown();
};

Game.prototype.init = function(data) {
	var p = $("<p/>").text("Vous etes a la position " + data.position);
	this.gameDiv.append(p);
};

Game.prototype.slideDown = function() {
	this.gameDiv.slideDown();
};

Game.prototype.slideUp = function(callback) {
	this.gameDiv.slideUp(callback);
};

Game.prototype.attachListeners = function() {
	$("#leave-form").submit(this.leave);
	$("#list-button").click(function(event) {
		game.refreshGameList();
		game.refreshDeferred.done(game.displayList.bind(game));
	});
};

Game.prototype.leave = function(event) {
	$.ajax({
		method: $(this).attr("method"),
		url: $(this).attr("action"),
		data: $(this).serialize(),
	})
	.done(function(data) {
		if (data.success) {
			game.slideUp(function() {
				dashboard.slideDown();
			});;
		} else {
			displayAlert("danger", "Vous n'avez pas pu quitter la partie : " + data.message);
		}
	});

	return false;
};


Game.prototype.refreshGameList = function() {
	$.ajax({
		method: "get",
		url: "gameList"
	})
	.done(function(data) {
		if (data.success) {
			game.gameList = data.list;
			game.refreshDeferred.resolve();
		}
	});
};

Game.prototype.displayList = function() {
	$("#gameList").empty();
	for (index in this.gameList) {
		var entry = $("<p/>").text(this.gameList[index].name);
		$("#gameList").append(entry);
	}
};