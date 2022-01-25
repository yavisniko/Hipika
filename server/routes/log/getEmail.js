const UserScheme = require("../../models/userModel")
const router = require("express").Router()

router.get("/email/:email", (req, res) => {
  const { email } = req.params

  UserScheme.findOne({ email: email }, (err, model) => {
    if (err) {
      console.log(err)
      return
    }

    res.send({
      email: model.email,
      name: model.name,
      image: model.image,
      surname: model.surname,
      followers: model.followers,
      following: model.following,
      verified: model.verified,
      tester: model.tester,
      early_access: model.early_access,
      developer: model.developer,
    })
  }).clone()
})

module.exports= router 
