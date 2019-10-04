var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


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
    verified: {
        type: Boolean,
        default: false
    }
});
User.plugin(passportLocalMongoose, {usernameField:"email"});

module.exports = mongoose.model('User', User);