const express = require('express')
const router = express.Router()
const sha1 = require('sha1')
const config = require('config')
const jwt = require('jsonwebtoken')

const User = require('../user/User')

router.post('/', (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }

    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'User does not exist' })
            if (sha1(password) != user.password) return res.status(400).json({ msg: 'Password is incorrect' })

            res.status(200).send("it works")
            console.log("it works!")
        })
})

module.exports = router