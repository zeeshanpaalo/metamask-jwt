const mongoose = require("mongoose");

const TOKENS = mongoose.Schema({
  tokenAddress: { type: String },
});

const TokenModel = mongoose.model("token", TOKENS);

module.exports = { TokenModel };
