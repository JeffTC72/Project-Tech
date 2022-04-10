const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GameSchema = new Schema({
    game: String,
    character: String,
    img: String,
});

const Game = mongoose.model('Game', GameSchema, 'games');

module.exports = Game;