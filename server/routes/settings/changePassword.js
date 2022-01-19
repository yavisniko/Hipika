const UserScheme = require('../../models/userModel')
const router = require('express').Router()


router.put('/change-password/:password/:user_id', (req, res) => {
  const {password, user_id} = req.params

  UserScheme.findById(user_id, (err, model) => {
    if(err){
      console.log(err);
      return
    }

    model.password = password
    model.save()

    res.send({
      msg: 'successfuly saved'
    })
  })
})

module.exports = router