const mongoose = require('mongoose');
const {Schema} = mongoose;

const ticketSchema = new Schema({
    userID: String,
    ubicacion: {
        type: String,
        default: null
    },
    date: {
        type: String,
        default: Date()
    },
    ruta: {
        type: String,
        default: null
    },
    used:{
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('ticket',ticketSchema);