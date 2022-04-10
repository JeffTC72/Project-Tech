const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CardSchema = new Schema({
    game: String,
    character1: String,
    character2: String,
    character3: String,
    character1img: String,
    character2img: String,
    character3img: String,
    rank: String,
    hoursplayed: String,
});

const Card = mongoose.model('Card', CardSchema, 'cards');

module.exports = Card;