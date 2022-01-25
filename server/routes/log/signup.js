const express = require("express")
const router = express.Router()
const Users = require("../../models/userModel")
const mongoose = require("mongoose")
const CRYPTOJS = require("crypto-js")

var rand = function() {
  return Math.random().toString(36).substr(2); 
};

var token = function() {
  return rand() + rand(); 
};


router.post("/signup", (req, res) => {
  const { name, surname, email, password, path } = req.body
  const encrypt = CRYPTOJS.AES.encrypt(password, process.env.HASH_SECRET)
  let addNew = false

  Users.findOne({email: email}, (err, model) => {
    if(model){
      res.send({
        msg: "email exists"
      })
      return
    }
  })
  
  const userData = new Users({
    _id: mongoose.Types.ObjectId(),  
    name: name,
    surname: surname,
    email: email,
    password: encrypt,
    image: path,
    token_validate: token(),
    followers: [],
    following: [],
    verified: false,
    early_access: false,
    tester: false,
    developer: false
  })

  userData
    .save()
    .then((result) => {
      res.send({
        token: result._id,
        token_validate: result.token_validate
      })
    })
    .catch((err) => console.log(err))
})

module.exports = router
