const app = require('express')();
const userAuth = require('./routes/signup')

//! local host keeps realoading NEEDS TO FIX!
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(bodyParser.json)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const dbURL = 'mongodb+srv://callmenikk:polisjoxi0@cluster0.dvs5k.mongodb.net/blog-mongodb?retryWrites=true&w=majority'

mongoose.connect(dbURL, { useNewUrlParser: true })
.then(() => {
    app.listen(5001)
    console.log("connected to mongoDB")
})
.catch(err => console.log(err))


app.post('/signup', (req, res) => {
    const userAuth = req.body
    console.log('triggered')

    res.status(200).send({
        status: 200,
        success: true,
        data: userAuth
    })
})

app.get('/test', (req, res) => {
    res.send('Hello World!')
})
