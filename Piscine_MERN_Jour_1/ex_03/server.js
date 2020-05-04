const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const fs = require('fs')
const http = require('http');

require('dotenv').config()

const app = express()


app.get('/', function(req, res) {
    fs.readFile('hello.html', function(err, data) {
        res.sendFile(__dirname + '/hello.html');
    });
});

app.get('/name/:name', function(req, res, next) {
    res.send(`Hello ${req.params.name}`)
})

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