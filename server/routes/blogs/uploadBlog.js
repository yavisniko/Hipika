const express = require('express')
const router = express.Router()
const UploadBlog = require('../../models/blogSchema')
const multer = require('multer')
const uuid = require('uuid')

const DIR = './public/';

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, DIR)
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join("-")
    cb(null, uuid() + '-' + fileName)
  }
})

const upload = multer({
  storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
})

router.post('/upload-blog/:id', upload.single('blogImg'),async (req, res) => {
  const {id} = req.params
  const blogData = req.body

  const url = req.protocol + '://' + req.get('host')

  console.log({
    id: id,
    file: req.file
  })

  // const blog = new UploadBlog({
  //   userId: id,
  //   blog: {
  //     image: url + '/public/' + req.file.name, 
  //     title: blogData.title,
  //     mainContent: blogData.mainContent
  //   }
  // })

  // user.save().
  // then(result=> {
  //   res.send({
  //     success: true,
  //     msg: "blog uploaded successfully"
  //   })
  // }).clone().catch(err => {
  //   console.log(err)
  // })
})

module.exports = router