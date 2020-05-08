const express = require('express')
const router = express.Router()
const sha1 = require('sha1')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

const User = require('../user/User')


//api/auth/
router.post('/', (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }

    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'User does not exist' })
            if (sha1(password) != user.password) return res.status(400).json({ msg: 'Password is incorrect' })

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

// api/auth/user
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
})

module.exports = router