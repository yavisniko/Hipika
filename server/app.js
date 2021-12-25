const express = require('express');
const app = express();
const userAuth = require('./routes/log/signup')
const userLogin = require('./routes/log/login')

const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json()) 

const dbURL = 'mongodb+srv://callmenikk:polisjoxi0@cluster0.dvs5k.mongodb.net/blog-mongodb?retryWrites=true&w=majority'

mongoose.connect(dbURL, { useNewUrlParser: true })
.then(() => {
    console.log("connected to mongoDB")
})
.catch(err => console.log(err))

app.use('/', userAuth)
app.use('/', userLogin)
 
app.listen(5000)