const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const fs = require('fs')
const url = require('url')
const querystring = require('querystring');
const myMERN_module = require('./myMERN_module')
require('dotenv').config()

const app = express()
myMERN_module.create("test");
myMERN_module.update("test", "content test");
myMERN_module.delete("test");

app.set('views', './view');
app.set('view engine', 'ejs');

app.get('/files/:name', async function(req, res) {
    let result = await myMERN_module.read(req.params.name);
    res.send(result);
});

app.post('/files/:name', async function(req, res) {
    let result = await myMERN_module.create(req.params.name);
    res.send(result);
});

app.put('/files/:name/:content', async function(req, res) {
    let result = await myMERN_module.update(req.params.name, req.params.content);
    res.send(result);
});

app.delete('/files/:name', async function(req, res) {
    let result = await myMERN_module.delete(req.params.name);
    res.send(result);
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