let mongoose = require('mongoose')

const Schema = mongoose.Schema;

let PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
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
    }
    // category: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Category'
    // }
})

let Post = mongoose.model('Post', PostSchema)

module.exports = Post