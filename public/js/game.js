function Game() {
	this.gameDiv = $("#game");
	this.attachListeners();
}

Game.prototype.show = function() {
	this.gameDiv.slideDown();
};

Game.prototype.init = function(data) {
	console.log("Position : ", data.position);
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
	// $("#list-button").click(function(event) {
	// 	$("#gameList").slideDown();
	// });
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