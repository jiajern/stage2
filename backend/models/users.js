var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
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
    }
}, {
    timestamps: true
});

var User = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    balance: {
        type: Currency,
        default: 5000,
        min: 0
    },
    own_stock: [Stock],
    verified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
User.plugin(passportLocalMongoose, {usernameField:"email"});

module.exports = mongoose.model('User', User);