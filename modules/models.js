var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({
	player1: String,
	player2: String
});

var userSchema = new mongoose.Schema({
	email: String,
	pseudo: String,
	password: String
});

module.exports = {
	Game: mongoose.model('Game', gameSchema),
	User: mongoose.model('User', userSchema)
}