const { ActivityModel } = require("../models/Activity");

const getActivities = async (req, res) => {
  try {
    // TODO: return activity from activity Model.
    //   // verify jwt and decode publiaddress
    //   // fetch activity for the address
    //   // return
    return [];
  } catch (error) {
    return res.status(500).send({ success: false, message: "Server Error" });
  }
};

module.exports = { getActivities };
