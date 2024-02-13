const mongoose = require("mongoose");
const USER = mongoose.Schema({
  publicKey: { type: String, required: true, unique: true },
  nonce: { type: Number },
});

const UserModel = mongoose.model("user", USER);

module.exports = { UserModel };
