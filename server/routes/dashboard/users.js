const express = require("express")
const UserSchema = require("../../models/userModel")
const router = express.Router()

router.get("/user/:id", (req, res) => {
  const { id } = req.params

  UserSchema.findById(id)
    .then((result) =>
      res.send({
        name: `${result.name} ${result.surname}`,
        image: result.image,
        id: id,
      })
    )
    .catch((err) => console.log(err))
})

module.exports = router
