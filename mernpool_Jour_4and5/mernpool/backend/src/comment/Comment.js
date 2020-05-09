let mongoose = require('mongoose')

const Schema = mongoose.Schema;

let CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
})

let Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment