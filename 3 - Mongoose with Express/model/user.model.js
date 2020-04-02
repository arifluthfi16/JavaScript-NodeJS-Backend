const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username : {
        type : String,
        required : true
    },
    email : {
         type : String,
        unique : true
    }
});

module.exports = mongoose.model('User', UserSchema)