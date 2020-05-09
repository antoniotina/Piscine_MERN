const express = require('express')
const router = express.Router()
const sha1 = require('sha1')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

const Post = require('../post/Post')
const User = require('../user/User')
const Comment = require('./Comment')

// get all comments -> api/comment/
router.get('/', (req, res) => {
    Comment.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
})

// get comments of a post -> api/comment/post
router.post('/post', (req, res) => {
    const { post } = req.body

    if (!post) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }

    Comment.find({ post: post })
        .sort({ date: -1 })
        .then(comments => res.json(comments))
})

// post -> api/comment/
router.post('/', (req, res) => {
    const { content, creator, post } = req.body

    if (!content || !creator) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }

    const newComment = new Comment({
        content,
        creator,
        post,
        date: Date.now()
    })

    newComment.save()
        .then(comment => {
            if (!comment) return res.status(400).json({ msg: 'The comment was not added, please try again' })
            User.findById(creator)
                .then(user => {
                    if (!user) return res.status(400).json({ msg: 'User does not exist' })
                    user.comments.push(comment._id)

                    res.json({
                        comment: {
                            content: comment.content,
                            creator: comment.creator,
                            post: comment.post,
                            date: comment.date
                        }
                    })
                    return user.save()
                })
            Post.findById(post)
                .then(post => {
                    if (!post) return res.status(400).json({ msg: 'Post does not exist' })
                    post.comments.push(comment._id)

                    return post.save()
                })
        })
})

//delete api/comment/:id
router.delete(`/:id`, (req, res) => {
    Comment.findById(req.params.id)
        .then(comment => {
            comment.delete()
        })
})


module.exports = router