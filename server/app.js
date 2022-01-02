const express = require('express');
const app = express();
const userAuth = require('./routes/log/signup')
const Login = require('./routes/log/login')
const getBlogs = require('./routes/dashboard/blogs')
const getUser = require('./routes/dashboard/getUser')
const uploadBlog = require('./routes/blogs/uploadBlog')
const uploadUser = require('./routes/blogs/userBlog')
const Users = require('./routes/dashboard/users')
const Like = require('./routes/blogs/likeBlog')
const SpecificBlog = require('./routes/blogs/currect_blog')

const mongoose = require('mongoose')
const cors = require('cors') 
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json()) 
app.use(express.static('uploads'))

const dbURL = 'mongodb+srv://callmenikk:polisjoxi0@cluster0.dvs5k.mongodb.net/blog-mongodb?retryWrites=true&w=majority'

mongoose.connect(dbURL, { useNewUrlParser: true }) 
.then(() => {
    console.log("connected to mongoDB")
})
.catch(err => console.log(err))

app.use('/', userAuth)
app.use('/', Login)
app.use('/', Users)

app.use('/dashboard', getUser)
app.use('/dashboard', getBlogs)

app.use('/blog', uploadBlog)
app.use('/blog', uploadUser)
app.use('/blog', Like)
app.use('/blog', SpecificBlog)

app.listen(5000)