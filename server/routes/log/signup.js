const express = require("express")
const router = express.Router()
const Users = require("../../models/userModel")
const mongoose = require("mongoose")

router.post("/signup", (req, res) => {
  const { name, surname, email, password, path } = req.body

  const userData = new Users({
    _id: mongoose.Types.ObjectId(),
    name: name,
    surname: surname,
    email: email,
    password: password,
    image: path,
    followers: [],
    following: [],
  })
  userData
    .save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => console.log(err))
})

module.exports = router
