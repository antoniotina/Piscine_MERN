let mongoose = require('mongoose')
const sha1 = require('sha1')
let bcrypt = require('bcrypt')

let ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    }
})

let Product = mongoose.model('Product', ProductSchema)

module.exports = Product