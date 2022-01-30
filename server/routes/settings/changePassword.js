const UserScheme = require("../../models/userModel")
const router = require("express").Router()
const { tokenValidator } = require("../../middleware/tokenValidator")
const CRYPTOJS = require("crypto-js")
const { decrypt } = require("../../middleware/decrypt")

const rand = () => {
  return Math.random().toString(36).substr(2)
}

const token = () => {
  return rand() + rand()
}

router.put(
  "/change-password/:old_pass/:password/:requestor/:tokenValidate",
  tokenValidator,
  (req, res) => {
    const { password, requestor, old_pass } = req.params

    const encrypt = CRYPTOJS.AES.encrypt(password, process.env.HASH_SECRET)

    UserScheme.findById(requestor, (err, model) => {
      if (err) {
        console.log(err)
        return
      }

      if (old_pass !== decrypt(model.password)) {
        res.send({
          msg: "invalid password",
        })
      } else {
        const new_client_secret = token()
        model.password = encrypt
        model.token_validate = new_client_secret
        model.save()

        res.send({
          msg: "successfuly saved",
          new_token: new_client_secret,
        })
      }
    })
  }
)

module.exports = router
