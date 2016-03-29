function Game() {
	this.gameDiv = $("#game");
}

Game.prototype.show = function() {
	this.gameDiv.slideDown();
};

Game.prototype.init = function(message) {
	this.gameDiv.append(
		$("<p/>").text("message")
	);
};

