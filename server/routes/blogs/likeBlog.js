const express = require('express')
const BlogSchema = require('../../models/blogSchema')
const router = express.Router()


router.put('/:blogId/liked/:authId', async (req, res) => { 
  const {blogId, authId} = req.params

  BlogSchema.findById(blogId, (err, model) => {
    const likes = model.blog.likes
    const likedIds = [] 
    
    for(let i= 0; i < likes.length; i++){
      likedIds.push(likes[i]._id.toString())
    }


    if(likedIds.includes(authId)){ 
      model.blog.likes = likedIds.filter(e => e !== authId)
      res.send({success: true, msg:"removed like"})
    }else {
      model.blog.likes.push(authId) 
      res.send({success: true, msg:"added like"})
    } 
    model.save()

  }) 
})
  
module.exports = router 