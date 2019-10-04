var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

var Transaction = new Schema({
    stock:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        min: 1,
        required: true
    },
    is_sell:{
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});

module.exports = Transaction;