const express = require("express")
const router = express.Router()
const multer = require("multer")
const fs = require("fs")

const storage = multer.diskStorage({
  //where to store
  destination: async (req, res, cb) => {
    //user id
    const { token } = req.params
    //specific user directory
    const path = `../public/uploads/${token}`

    fs.mkdirSync(path, { recursive: true })
    cb(null, path)
  },
  filename: (req, file, cb) => {
    //in which format to save
    const pathName = `${req.params.id}-${file.originalname}`
    cb(null, pathName)
  },
})

const upload = multer({ storage: storage })

router.post("/upload/image/:id/:token", upload.single("file"))

module.exports = router
