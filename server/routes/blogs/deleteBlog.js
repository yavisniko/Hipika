const BlogScheme = require('../../models/blogSchema')
const router = require('express').Router()


router.delete('/delete/:id', (req, res) => {
  const { id } = req.params

  BlogScheme.findByIdAndDelete(id, (err, doc) => {
    if(err){
      res.send({msg: err})
    }else {
      res.send({msg: 'deleted'})
    }
  })
})

module.exports = router