const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const fs = require('fs')
const querystring = require('querystring')
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert')
const app = express()
const bodyParser = require('body-parser')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// Connection URL
const url = 'mongodb://localhost:27042/'
const port = process.env.PORT || 4242
const host = process.env.HOST || 'localhost'
process.env.NODE_ENV = "development"

app.get('/', (req, res) => {

    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
        if (err) {
            throw err
        } else {
            let dbo = db.db("mern-pool")
            var query = { validated: "in progress" };
            dbo.collection('students').find(query).sort({ lastname: 1 }).toArray(function(err, result) {
                if (err) throw err;
                res.send(result);
            });
        }
    });
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})