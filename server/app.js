const express = require('express');
const app = express();
// const userAuth = require('./routes/signup')

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


app.post('/signup', (req, res) => {
    const userAuth = req.body
    
    res.status(200).send({
        status: 200,
        success: true,
        data: userAuth
    })
})

app.get('/', (req, res) => {
    res.json('Hello World!')
})

 
app.listen(5000)