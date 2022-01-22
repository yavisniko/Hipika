const router = require("express").Router()
const BlogScheme = require("../../models/blogSchema")

router.put("/edit/submitChanges/:id/:token", (req, res) => {
  const { id, token } = req.params
  const { img, title, main_content } = req.body

  BlogScheme.findById(id, (err, model) => {
    ;(model.blog.file = model.blog.file === img ? img : `${token}/${img}`),
      (model.blog.title = title)
    model.blog.mainContent = main_content

    model.save()

    res.status(200).send({ msg: "changes saved" })
  })
})

module.exports = router
