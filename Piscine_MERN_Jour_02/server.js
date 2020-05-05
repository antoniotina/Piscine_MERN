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

app.get('/', function(req, res) {
    fs.readFile('hello.html', function(err, data) {
        res.sendFile(__dirname + '/form.html')
    })
})

app.post('/insert', (req, res) => {

    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
        if (err) {
            throw err
        } else {
            let dbo = db.db("mern-pool")
            dbo.collection('students').insertOne(req.body.student)
                // dbo.collection('students').insertOne(req.body.student, function(err, res) {
                //     if (err) throw err
                //     console.log(res.ops)
                //     console.log("1 document inserted")
                // })
            res.send("Connection successful.")
        }
    });
})

// app.post('/insert', function(req, res) {
//     console.log('Got body:', req.body);
//     console.log(req.body.admin)
// })

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})