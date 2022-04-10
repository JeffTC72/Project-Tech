const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CardSchema = new Schema({
    game: String,
    character1: { type: Schema.Types.ObjectId, ref: 'Game' },
    character2: { type: Schema.Types.ObjectId, ref: 'Game' },
    character3: { type: Schema.Types.ObjectId, ref: 'Game' },
    rank: String,
    hoursplayed: String,
});

const Card = mongoose.model('Card', CardSchema, 'cards');

module.exports = Card;