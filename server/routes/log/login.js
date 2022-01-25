const express = require("express")
const router = express.Router()
const userAuth = require("../../models/userModel")
const CRYPTOJS = require("crypto-js")

const decrypt = (user_pw) => {
  const byte = CRYPTOJS.AES.decrypt(user_pw, process.env.HASH_SECRET)
  return byte.toString(CRYPTOJS.enc.Utf8) 
}

router.post("/login", async (req, res) => {
  const { email, password } = req.body
  
  await userAuth
    .findOne({ email: email }, (err, user) => {
      if (err) {
        res.send({
          status: 0,
          msg: err,
        })
      } 
      if (!user) {
        res.send({
          status: 0,
          msg: "user not found",
        })
      } else if (decrypt(user.password) !== password) {
        res.send({
          status: 0,
          msg: "password is incorrect",
        })
      } else {
        res.send({
          token: user._id,   
          tokenValidator: user.token_validate
        })
      }
    })
    .clone()
    .catch((err) => console.log(err))
})

module.exports = router
