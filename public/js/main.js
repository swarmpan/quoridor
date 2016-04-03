var index;
var dashboard;
var game;
var plateau;

$(document).ready(function() {
	dashboard = new Dashboard();
	index = new Index();
	game = new Game();

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
			dashboard.init(data.email, data.pseudo);
			dashboard.slideDown();
		}
	});
}