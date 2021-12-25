const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const BlogSchema = new Schema({
  userID: {type: String, required: true},
  blog: {
    file: {type: String},
    title: {type: String},
    mainContent: {type: String}
  }
})

module.exports = mongoose.model('blogs', BlogSchema)