const express = require("express")
const router = express.Router()
const userAuth = require("../../models/userModel")
const { decrypt } = require('../../middleware/decrypt')

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
