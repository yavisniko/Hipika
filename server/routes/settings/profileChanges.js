const router = require('express').Router()
const UserModel = require('../../models/userModel')

router.put('/user-changes/:id', (req, res) => {
  const { id } = req.params
  const { name, surname, path } = req.body

  UserModel.findById(id, (err, model) => {
    if(err) {
      cosnole.log(err)
      return
    }
  
    model.name = name
    model.surname = surname
    model.image = path

    model.save()

    res.send({
      success: true
    })

  })
})

module.exports = router