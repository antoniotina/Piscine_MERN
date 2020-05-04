const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const fs = require('fs')
const url = require('url')
const querystring = require('querystring');

require('dotenv').config()

const app = express()

app.set('views', './view');
app.set('view engine', 'ejs');

app.get('/name/:name', function(req, res) {
    res.render('ex_04', { name: req.params.name });
});

// app.get('/name/', function(req, res, next) {
//     res.send(`Hello unkown, i dont know your age`)
// })

// app.get('/name/:name', function(req, res, next) {
//     let parsedUrl = url.parse(req.url);
//     let parsedQs = querystring.parse(parsedUrl.query);
//     console.log(parsedQs.age)
//     if (parsedQs.age) {
//         res.send(`Hello ${req.params.name}, you have ${parsedQs.age} yo`)
//     } else if (req.params.name) {
//         res.send(`Hello ${req.params.name}`)
//     } else {
//         res.send(`Hello unkown, i dont know your age`)
//     }
// })

const port = process.env.PORT || 4242
const host = process.env.HOST || 'localhost'
process.env.NODE_ENV = "development"

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
})

// const indexRouter = require('./routes/index')

// app.use('/index', indexRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})