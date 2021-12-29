const express = require('express')
const BlogSchema = require('../../models/blogSchema')

const router = express.Router() 

router.get('/blogs', async (req, res) => {
  await BlogSchema.find()
  .then(result => res.send(result))
  .catch(err => res.send(err))
})

module.exports = router