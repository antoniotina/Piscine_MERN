const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const fs = require('fs')
const querystring = require('querystring')
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert')
const app = express()

// Connection URL
const url = 'mongodb://localhost:27042/'
const port = process.env.PORT || 4242
const host = process.env.HOST || 'localhost'
process.env.NODE_ENV = "development"


app.get('/', async function(req, res) {
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
        if (err) {
            res.send("Connection failed.")
            console.log("Connection failed.");
        } else {
            res.send("Connection successful.")
            console.log("Connection successful.");
        }
    });
});


app.use(cors())
app.use(express.json())
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})