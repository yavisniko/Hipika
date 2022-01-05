const blogSchema = require("../../models/blogSchema")
const router = require("express").Router()

router.get("/:id", (req, res) => {
  const { id } = req.params

  blogSchema.findById(id, (err, model) => {
    if (err) console.log(err)

    res.send(model)
  })
})

module.exports = router
