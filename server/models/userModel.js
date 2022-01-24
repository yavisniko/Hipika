const { Schema } = require("mongoose")
const mongoose = require("mongoose")

const signUpSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
    followers: [{ _id: { type: String } }],
    following: [{ _id: { type: String } }],
    verified: { type: Boolean, required: true },
    early_access: { type: Boolean, required: true },
    tester: { type: Boolean, required: true },
    developer: { type: Boolean, required: true }
  },
  { strict: false, timestamps: true }
)

module.exports = mongoose.model("users", signUpSchema)
