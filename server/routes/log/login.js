const express = require('express')
const router = express.Router()
const UserLogin = require('../../models/loginSchema')

router.post('/login', async (req, res) => {
    const {
        email,
        password
    } = req.body 

    let data;

    if(email.length > 0 && password.length > 0) {
        data = {
            email: email,
            passowrd: password
        }
    }

    await UserLogin.findOne(data, (err, user) => {
        if(err){
            res.json({
                status: 0,
                msg: err
            })
        }
        if(!user){
            res.json({
                status: 0,
                msg: "user not found"
            })
        }else {
            res.json({
                status: 200,
                id: user.__id,
                message: "success"
            })
        }
    })
})

module.exports = router