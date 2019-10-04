var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

var Stock = new Schema({
    symbol:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        require: true
    },
    price:{
        type: Currency,
        require: true
    },
    owns:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
}, {
    timestamps: true
});

module.exports = Stock;