const BlogsSchema = require("../../models/blogSchema")
const router = require("express").Router()

router.get("/blog-user/:id", async (req, res) => {
  const { id } = req.params

  BlogsSchema.find({ userID: id }, (err, blogs) => {
    if (err) console.log(err)
    else {
      res.send(blogs)
    }
  })
})

module.exports = router
