var index;
var dashboard;
var game;
var plateau;

$(document).ready(function() {
	dashboard = new Dashboard();
	index = new Index();
	game = new Game();
	plateau = new Plateau(9);

	checkConnected();
});

function checkConnected() {
	$.ajax({
		method: "get",
		url: "isConnected"
	})
	.done(function(data) {
		if (data.connected) {
			index.slideUp();
			dashboard.slideDown(data.email);
		}
	});
}