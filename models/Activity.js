const mongoose = require("mongoose");

const ACTIVITY = mongoose.Schema({
  to: { type: String },
  from: { type: String },
  amount: { type: Number },
  tokenAddress: { type: String },
  tx: { type: String },
});

const ActivityModel = mongoose.model("activity", ACTIVITY);

module.exports = { ActivityModel };
