const express = require('express')
const mongoose = require('mongoose')
let session = require('express-session')
const product = require("./src/product/api")
const user = require("./src/user/api")
const app = express()
const cors = require('cors')
let MongoStore = require('connect-mongo')(session)
let MongoClient = require('mongodb').MongoClient,
    assert = require('assert')

// Connection URL
const url = 'mongodb://localhost:27042/'
const port = process.env.PORT || 4242
process.env.NODE_ENV = "development"

mongoose.connect('mongodb://localhost:27042/mern-pool', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useCreateIndex', true)
let db = mongoose.connection

app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}))

app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next();
});

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use("/user", user)
app.use("/product", product)
app.set('views', './view')
app.set('view engine', 'ejs')

db.once('open', function() {
    console.log("We're connected!")
})

app.get('/', function(req, res) {
    res.render('index')
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})