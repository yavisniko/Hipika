const router = require('express').Router()
const BlogScheme = require('../../models/blogSchema')

router.get('/edit/:id/:editor_id', (req,res) => {
  const {id, editor_id} = req.params

  BlogScheme.findById(id, (err, model) => {

    if(model.userID !== editor_id){
      res.status(403).send({
        msg: "invalid editor"
      })
    }else {
      res.send(model)
    }
  }).clone()
})

module.exports = router