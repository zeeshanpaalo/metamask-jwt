const mongoose = require("mongoose");

const connection = async (url) => {
    console.log(url)
  return mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("connect to mongoose db");
      return "connected";
    })
    .catch((err) => {
      console.log("mongoose connection error", err);
      return null;
    });
};

module.exports = { connection };
