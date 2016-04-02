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


Game.prototype.attachListeners = function() {
	$("#leave-form").submit(this.leave);
};

Game.prototype.leave = function(event) {
	console.log("Leaving game " + this.id);
	console.log($(this).attr("action"))
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
	});

	return false;
};