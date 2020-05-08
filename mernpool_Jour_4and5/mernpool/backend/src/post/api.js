const express = require('express')
const router = express.Router()
const sha1 = require('sha1')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

const Post = require('./Post')
const User = require('../user/User')

// get -> api/post/
router.get('/', (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
})

// get -> api/post/user
router.post('/user', (req, res) => {
    const { id } = req.body

    Post.find({ creator: id })
        .sort({ date: -1 })
        .then(posts => {
            res.json(posts)
        })
})

// post -> api/post/
router.post('/', (req, res) => {
    const { title, content, creator } = req.body

    if (!title || !content) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }

    const newPost = new Post({
        title,
        content,
        creator,
        date: Date.now()
    })

    newPost.save()
        .then(post => {
            if (!post) return res.status(400).json({ msg: 'The post was not added, please try again' })
            User.findById('5eb505ae631dbb502ca004ac')
                .then(user => {
                    if (!user) return res.status(400).json({ msg: 'User does not exist' })
                    user.posts.push(post._id)

                    res.json({
                        post: {
                            title: post.title,
                            content: post.content,
                            creator: post.creator,
                            date: post.date
                        }
                    })
                    return user.save()
                })
        })
})

//delete api/post/:id
router.delete(`/:id`, (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            post.delete()
        })
});

module.exports = router