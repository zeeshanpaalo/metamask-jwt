const express = require("express");
const router = express.Router();
const { getNonce, loginUser } = require("../controllers/login");
const { getActivities } = require("../controllers/activity");

router.get("/nonce", getNonce);
router.get("/activity", getActivities);
router.get("/login", loginUser);

router.get("*", async (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

module.exports = router;
