const express = require('express')
const UserSchema = require('../../models/userModel')
const router = express.Router()

router.get('/user/:id', async (req, res) => {
    const {id} = req.params

    await UserSchema.findById(id)
    .then(result => res.send({
      name: `${result.name} ${result.surname}`,
      image: result.image,
      id: id
    }))
    .catch(err => console.log(result))
})
   
module.exports = router