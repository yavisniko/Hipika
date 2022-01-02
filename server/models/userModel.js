const { Schema } = require('mongoose')
const mongoose = require('mongoose')

const signUpSchema = new Schema({
    name: {type: String, required: true}, 
    surname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}, 
    image: {type: String},   
    followers: [{_id: String}]
}, {strict: false})

const Users = mongoose.model('users', signUpSchema)
module.exports = Users  