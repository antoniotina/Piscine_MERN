const express = require('express')
const router = express.Router()
const sha1 = require('sha1')
let mongoose = require('mongoose')
let User = require('./userModel')


router.get('/formregister', function(req, res) {
    res.render('user/formregister')
})

router.get('/formlogin', function(req, res) {
    res.render('user/formlogin')
})

router.get('/profile', function(req, res) {
    if (req.session.user) return res.status(200).render('../view/user/profile')
    return res.redirect('/')
})


router.post('/register', async function(req, res, next) {

    let username = await User.find({ 'username': req.body.user.username })
    let email = await User.find({ 'email': req.body.user.email })
    if (username.length)
        return res.status(400).send("Username already taken, <a href='/user/formregister'>Go back</a>")
    else if (email.length)
        return res.status(400).send("Email already taken already taken, <a href='/user/formregister'>Go back</a>")
    else if (req.body.user.pw !== req.body.user.confirmpw)
        return res.status(400).send("passwords dont match <a href='/user/formregister'>Go back</a>")

    let newUser = {
        email: req.body.user.email,
        username: req.body.user.username,
        password: sha1(req.body.user.pw),
        admin: false,
    }

    console.log(newUser)
    User.create(newUser, function(error, user) {
        if (error) {
            return next(error)
        } else {
            req.session.user = user;
            res.locals.user = req.session.user;
            return res.redirect('./profile')
        }
    })
})

router.post('/login', function(req, res, next) {
    User.authenticate(req.body.user.email, req.body.user.pw, function(error, user) {
        if (error || !user) {
            var err = new Error('Wrong email or password.');
            err.status = 401;
            return next(err);
        } else {
            req.session.user = user;
            res.locals.user = req.session.user;
            return res.redirect('./profile');
        }
    });
})

router.get('/logout', function(req, res, next) {
    if (req.session) {
        req.session.destroy(function(err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

module.exports = router