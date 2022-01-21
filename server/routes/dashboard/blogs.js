const express = require("express")
const BlogSchema = require("../../models/blogSchema")

const router = express.Router()  

router.get("/blogs/page/:page", async (req, res) => {
  const {page} = req.params
  let curr_page = []
  let message = "more"

  await BlogSchema.find()  
    .then((result) => {
        for(let i = Number(page+'0'); i < Number(page+'0') + 10; i++){
          //if looped items are real data push in array        
          if(typeof result[i] !== 'undefined'){
  
            curr_page.push(result[i])
          
          }else {
            //if indexes are "undefined" stop the loop
            message = 'no more'
            break
          
          }
        } 

        //last result
        res.send({
          msg: message,
          result: curr_page 
        })

    })
    .catch((err) => res.send(err))
})

module.exports = router
