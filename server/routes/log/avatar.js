const express = require("express")
const router = express.Router()
const multer = require("multer")
const fs = require("fs")

const storage = multer.diskStorage({
  //where to store
  destination: async (req, res, cb) => {
    //specific user directory
    const path = `../public/uploads/avatar`

    fs.mkdirSync(path, { recursive: true })
    cb(null, path)
  },
  filename: (req, file, cb) => {
    //in which format to save
    const pathName = `${req.params.fileId}-${file.originalname}`
    cb(null, pathName)
  },
})

const upload = multer({ storage: storage })

router.post("/upload/avatar/:fileId", upload.single("file"))

module.exports = router
