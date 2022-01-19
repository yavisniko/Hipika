const UserScheme = require('../../models/userModel')
const { ObjectId } = require('mongodb')
const router = require('express').Router()

router.put('/change-token/:old_id/:new_id', (req, res) => {
  const {old_id, new_id} = req.params


    doc = UserScheme.findOne({_id: ObjectId(old_id)})

    doc._id = ObjectId(new_id)

    db.clients.insert(doc) 

    db.clients.remove({_id: ObjectId(old_id)})

    res.send({
      msg: 'token changed successfully'
    })

  })

module.exports = router