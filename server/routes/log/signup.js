const express = require('express')
const router = express.Router()
const Users = require('../../models/register') 

router.post('/signup', (req,res) => {
    const userAuth = req.body
    const userData = new Users(userAuth)
    userData.save()
    .then(result => {
        res.send(result)
    })
    .catch(err => console.log(err))
})

module.exports = router 