const express = require('express')
const router = express.Router()
const Users = require('../models/register') 

router.post('/signup', (req, res) => {
    const userAuth = req.body
   
    res.status(200).send({
        status: 200,
        success: true,
        data: userAuth
    })
})

module.exports = router 