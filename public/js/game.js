function Game() {
	this.gameDiv = $("#game");
	this.attachListeners();
	this.gameList = {};
}

Game.prototype.show = function() {
	this.gameDiv.slideDown();
};

Game.prototype.init = function(data) {
	var p = $("<p/>").text("Vous etes a la position " + data.position);
	this.gameDiv.append(p);
	$(".card").removeClass("card-fixed")
		.addClass("card-adapt");
	plateau.display();
};

Game.prototype.slideDown = function() {
	this.gameDiv.slideDown();
};

Game.prototype.slideUp = function(callback) {
	this.gameDiv.slideUp(callback);
};

var refreshDeferred = $.Deferred();

Game.prototype.attachListeners = function() {
	$("#leave-form").submit(this.leave);
	$("#list-button").click(function(event) {
		game.refreshGameList();
		// Quand le deferred est résolu (par resfreshList)
		// on appelle displayList
		refreshDeferred.done(game.displayList.bind(game));
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
			$(".card").removeClass("card-adapt")
				.addClass("card-fixed");
			game.slideUp(function() {
				dashboard.slideDown();
			});
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
			refreshDeferred.resolve();
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