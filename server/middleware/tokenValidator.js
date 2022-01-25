const UserScheme = require('../models/userModel')

const tokenValidator = async (req, res, next) => {
  const {requstor, tokenValidate} = req.params
  

  try {
    await UserScheme.findById(requstor, (err, model) => {
      if(model.token_validate === tokenValidate){
        next()
      }else{  
        res.status(403).send({
          msg: "invalid user"
        })
        return
      }
    }).clone()
  }catch(err) {
    console.log('error occred', err);
  }
}

module.exports = { tokenValidator }