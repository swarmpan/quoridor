var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({
	id: String,
	name: String,
	player1: String,
	player2: String,
	position1: { x: Number, y: Number },
	position2: { x: Number, y: Number },
	walls: [mongoose.Schema.Types.Mixed],
	wall1: Number,
	wall2: Number,
	turn: Number,
	waiting: Boolean
});

var userSchema = new mongoose.Schema({
	email: String,
	pseudo: String,
	password: String,
	game: String
});

module.exports = {
	Game: mongoose.model('Game', gameSchema),
	User: mongoose.model('User', userSchema)
}