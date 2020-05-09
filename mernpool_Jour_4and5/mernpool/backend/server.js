const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const config = require('config')

// routes
const userRoutes = require('./src/user/api')
const authRoutes = require('./src/auth/api')
const postRoutes = require('./src/post/api')
const commentsRoutes = require('./src/comment/api')

const db = config.get('mongoURI')
const port = process.env.PORT || 8000
process.env.NODE_ENV = "development"

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// Connect to Mongo
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }) // Adding new mongo url parser
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

// Use Routes
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentsRoutes)

app.get('/', function(req, res) {
    res.send('index')
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})