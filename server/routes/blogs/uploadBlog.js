const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const UploadBlog = require('../../models/blogSchema')
const multer = require('multer')

const storage = multer.diskStorage({
  //where to store
  destination: async(req, file, cb) => {
     cb(null,'./uploads/')
  },
  filename: (req, file, cb) => {
    //in which format to save
    cb(null, String(new Date().getTime() + "-" + file.originalname))
  }
})

//TODO: reject file upload
const fileUpload = (req, file, cb) => {
  if(file.mimeType = "image/jpeg" || file.mimeType === "image/png") {
    cb(null, true)
  }else cb(null, false)
}

const upload = multer({storage: storage, limits: {
  fileSize: 1024 * 1024 * 5 //5MB
}})

router.post('/upload/:id', upload.single('file'),(req, res) => {
    const {id} = req.params
    const blogObject = req.body

    const uploadBlog = new UploadBlog({
      userID: id,
      blog: {
        _id: mongoose.Types.ObjectId(),
        file: req.file.path,
        title: blogObject.title,
        mainContent: blogObject.mainContent
      }
    })
})

module.exports = router 