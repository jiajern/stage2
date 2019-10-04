var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    }
});
User.plugin(passportLocalMongoose, {
    usernameField: email,
})

module.exports = mongoose.model('User', User);