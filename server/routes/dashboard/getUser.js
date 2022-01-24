const router = require("express").Router()
const userModel = require("../../models/userModel")

router.get("/getUser/:id", async (req, res) => {
  const { id } = req.params

  await userModel
    .findById(id, (err, result) => {
      if (err) {
        res.send({
          success: false,
          msg: err,
        })
        return
      } 
        
      
        res.send({
          key: result._id,
          userId: result._id,
          email: result.email,
          name: result.name,
          image: result.image,
          surname: result.surname,
          followers: result.followers,
          following: result.following,
          password: result.password,
          verified: result.verified,
          tester: result.tester,
          early_access: result.early_access,
          developer: result.developer
        })
      
    })
    .clone()
    .catch((err) => console.log(err))
})

module.exports = router
