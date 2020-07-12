const mongoose = require('mongoose');
const {Schema} = mongoose;

const cardSchema = new Schema({
    userID: String,
    owner:{
        type: String,
        default: ""
    },
    cvv: {
        type: String,
        default: null
    },
    number: {
        type: Number,
        default: null
    },
    month: {
        type: Number,
        default: null
    },
    year: {
        type: Number,
        default: null
    }
});

module.exports = mongoose.model('card',cardSchema);