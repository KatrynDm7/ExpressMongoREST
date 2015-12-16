module.exports = function(mongoose) {
    'use strict';

    var Schema = mongoose.Schema;

    var userSchema  = new Schema ({
        id: Number,
        email : String,
        password : String
    });

    return mongoose.model('users', userSchema);
}