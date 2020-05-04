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

app.get('/name/:name?', function(req, res) {
    let age = req.query.age != null ? 'you are ' + req.query.age + ' years old' : "I don't know your age"
    res.render('ex_05', { name: req.params.name || 'Unknown', age: age });
});

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