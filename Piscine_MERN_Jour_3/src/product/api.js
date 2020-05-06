const express = require('express')
const router = express.Router()
const cors = require('cors')
const url = require('url')
const querystring = require('querystring')
let request = require('request')
let mongoose = require('mongoose')
let Product = require('./productModel')


router.get('/list', async function(req, res) {
    if (!req.session.user) return res.redirect('/')

    let products = await Product.find()
    res.render('product/listproducts', { products })
})

router.get('/:id', async function(req, res) {
    if (!req.session.user) return res.redirect('/')

    let product = await Product.findById(req.params.id)
    res.render('product/singleproduct', { product })
})

router.get('/admin/add', function(req, res) {
    console.log(req.session.user.admin)
    if (!req.session.user || req.session.user.admin == false) return res.redirect('/')

    res.render('product/addproduct')
})

router.post('/admin/add', async function(req, res) {

    let title = await Product.find({ 'username': req.body.product.title })
    if (title.length)
        return res.status(400).send("Title already taken, <a href='/product/admin/add'>Go back</a>")
    else if (req.body.product.description.length < 5 || !isNaN(req.body.product.price))
        return res.status(400).send("Either your description is too small or your price is not a number <a href='/product/admin/add'>Go back</a>")

    let newProduct = {
        title: req.body.product.title,
        description: req.body.product.description,
        price: req.body.product.price
    }

    console.log(newProduct)
    Product.create(newProduct, function(error, product) {
        if (error) {
            return next(error)
        } else {
            return res.redirect('/product/admin/add')
        }
    })
})

module.exports = router