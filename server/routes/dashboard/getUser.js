const router = require("express").Router();
const mongoose = require("mongoose");
const userModel = require("../../models/userModel");

router.get("/getUser/:id", async (req, res) => {
  const { id } = req.params;

  await userModel.findById(id, (err, result) => {
    if (err) {
      res.send({
        success: false,
        msg: err,
      });
    } else {
      res.send({
        email: result.email,
        name: result.name,
        image: result.image,
        surname: result.surname
      });
    }
  }).clone().catch(err => console.log(err))
});

module.exports = router;
