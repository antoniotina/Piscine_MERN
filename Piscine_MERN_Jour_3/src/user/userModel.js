let mongoose = require('mongoose')
const sha1 = require('sha1')

let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        required: true,
    }
})

UserSchema.statics.authenticate = function(email, password, callback) {
    User.findOne({ email: email })
        .exec(function(err, user) {
            if (err) {
                return callback(err)
            } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            if (sha1(password) == user.password) {
                return callback(null, user);
            } else {
                return callback();
            }
        });
}

let User = mongoose.model('User', UserSchema)

module.exports = User