let mongoose = require('mongoose')

const Schema = mongoose.Schema;

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
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
})

let User = mongoose.model('User', UserSchema)

module.exports = User