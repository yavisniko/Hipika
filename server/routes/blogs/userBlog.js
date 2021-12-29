const UploadBlog = require('../../models/blogSchema')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

router.post('/upload/user/:id', async (req, res) => {
  const {userId, title, mainContent, file} = req.body
  const {id} = req.params

  const readyBlog = new UploadBlog({
    userID: userId,
    blog: {
      _id: mongoose.Types.ObjectId(),
      file: `${userId}/${id}-${file}`,
      title: title,
      mainContent: mainContent,
      likes: []
    }
  })

  await readyBlog.save()
})

module.exports = router