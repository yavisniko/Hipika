const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const loginSchema = new Schema({
    email: {type: String, required: true, unique: true},
    passowrd: {type: String, required: true, unique: true}
})
 
const Users = mongoose.model('users', loginSchema)
module.exports = Users