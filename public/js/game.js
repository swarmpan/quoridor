function Game() {
	this.gameDiv = $("#game");
	this.attachListeners();
}

Game.prototype.show = function() {
	this.gameDiv.slideDown();
};

Game.prototype.init = function(data) {
	console.log("Partie lancée ", data);
	this.id = data.gameData.id;
	this.position = data.position;
	this.walls = data.walls;

	$(".card").removeClass("card-fixed")
		.addClass("card-adapt");

	plateau = new Plateau(9);
	plateau.placePlayers(data.gameData.position1, data.gameData.position2);
	plateau.display();
};

Game.prototype.slideDown = function() {
	this.gameDiv.slideDown();
};

Game.prototype.slideUp = function(callback) {
	this.gameDiv.slideUp(callback);
};


Game.prototype.attachListeners = function() {
	$("#leave-form").submit(this.leave);
};

Game.prototype.leave = function(event) {
	console.log("Leaving game " + this.id);
	disableChildButtons($("#leave-form"), true);

	$.ajax({
		method: $(this).attr("method"),
		url: $(this).attr("action"),
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
	})
	.always(function() {
		disableChildButtons($("#leave-form"), true);
	});

	return false;
};