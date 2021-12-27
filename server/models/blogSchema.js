const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const BlogSchema = new Schema({
  userID: {type: String, required: true},
  blog: {
    _id: mongoose.Schema.Types.ObjectId, 
    file: {type: String, required: true},
    title: {type: String, required: true},
    mainContent: {type: String, required: true}
  }
})

module.exports = mongoose.model('blogs', BlogSchema)