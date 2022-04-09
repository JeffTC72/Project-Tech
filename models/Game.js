const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GameSchema = new Schema({
    name: String,

});

const Game = mongoose.model('Game', GameSchema, 'games');

module.exports = Game;