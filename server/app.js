const express = require("express")
const app = express()
const helmet = require('helmet')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()  
}

const userAuth = require("./routes/log/signup")
const Login = require("./routes/log/login")
const getBlogs = require("./routes/dashboard/blogs")
const getUser = require("./routes/dashboard/getUser")
const uploadBlog = require("./routes/blogs/uploadBlog")
const uploadUser = require("./routes/blogs/userBlog") 
const Users = require("./routes/dashboard/users")
const Like = require("./routes/blogs/likeBlog")
const SpecificBlog = require("./routes/blogs/currect_blog")
const avatar = require("./routes/log/avatar")
const FollowUser = require("./routes/dashboard/followUser")
const BlogByUser = require("./routes/blogs/blogsByUserId") 
const ProfileChanges = require("./routes/settings/profileChanges")
const passChange = require("./routes/settings/changePassword")
const validateEditor = require("./routes/blogs/validateEditor") 
const submitChanges = require("./routes/blogs/editBlog")
const deleteBlog = require("./routes/blogs/deleteBlog")
const userByEmail = require("./routes/log/getEmail")

const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")

app.use(cors())
app.use(bodyParser.json())
app.use(express.static("uploads"))
app.use(helmet())

const dbURL = process.env.DB_CONNECT
mongoose
  .connect(dbURL, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to mongoDB")
  })
  .catch((err) => console.log(err))

app.use("/", userAuth)
app.use("/", Login)
app.use("/", Users)
app.use("/", avatar)
app.use("/", userByEmail)

app.use("/dashboard", getUser)
app.use("/dashboard", getBlogs)
app.use("/dashboard", FollowUser)

app.use("/blog", uploadBlog)
app.use("/blog", uploadUser)
app.use("/blog", Like)
app.use("/blog", SpecificBlog)
app.use("/blog", BlogByUser)
app.use("/blog", validateEditor)
app.use("/blog", submitChanges)
app.use("/blog", deleteBlog)

app.use("/settings", ProfileChanges)
app.use("/settings", passChange)

app.listen(5000)
