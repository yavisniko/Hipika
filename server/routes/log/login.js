const express = require('express')
const router = express.Router()
const userAuth = require('../../models/userModel')

router.post('/login', async (req, res) => {
    const {
        email,
        password
    } = req.body 


    await userAuth.findOne({email: email}, (err, user) => {
        if(err){
            res.send({
                status: 0,
                msg: err
            })
        }
        if(!user){
            res.send({
                status: 0,
                msg: "user not found"
            })
        }else if(user.password !== password){
            res.send({
                status: 0,
                msg: "password is incorrect"
            })
        }else{
            res.send({
                status: 200,
                user_info: user
            })
        }
    }).clone().catch(err => console.log(err))
})

module.exports = router