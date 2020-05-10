const express = require('express')
const router = express.Router()
const sha1 = require('sha1')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

const User = require('./User')

// if we want to protect a route, just add auth after the route
// router.post('/', AUTH (req, res) => {
// LIKE THIS        ^^^^
// api/user/
router.post('/', (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }

    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'Email already in use' })
        })

    User.findOne({ username })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'Username already in use' })

            const newUser = new User({
                username,
                email,
                password,
                admin: false
            })

            newUser.password = sha1(newUser.password)

            newUser.save()
                .then(user => {
                    jwt.sign({ id: user.id }, config.get('jwtSecret'), { expiresIn: 7200 }, (err, token) => {
                        if (err) throw err
                        res.json({
                            token,
                            user: {
                                id: user.id,
                                username: user.username,
                                email: user.email
                            }
                        })
                    })

                })
        })
})

// get -> api/user/
router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
})

module.exports = router