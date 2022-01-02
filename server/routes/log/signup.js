const express = require('express')
const router = express.Router()
const Users = require('../../models/userModel') 

router.post('/signup', (req,res) => {
    const {name, surname, email, password, image} = req.body

    const userData = new Users({
        name: name,
        surname: surname,
        email: email,
        password: password,
        image: image
    })
    userData.save()
    .then(result => {
        res.send(result)
    })
    .catch(err => console.log(err)) 
 
})

module.exports = router 