const { ActivityModel } = require("../models/Activity");

require("dotenv").config();

const getActivities = async (req, res) => {
  try {
    const activities = await ActivityModel.find({
      $or: [{ to: req.user.publicKey }, { from: req.user.publicKey }],
    });
    return res.status(200).send({ success: true, message: activities });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Server Error" });
  }
};

module.exports = { getActivities };
