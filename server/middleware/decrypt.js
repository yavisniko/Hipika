const CRYPTOJS = require("crypto-js")

const decrypt = (user_pw) => {
  const byte = CRYPTOJS.AES.decrypt(user_pw, process.env.HASH_SECRET)
  return byte.toString(CRYPTOJS.enc.Utf8)
}

module.exports = { decrypt }
