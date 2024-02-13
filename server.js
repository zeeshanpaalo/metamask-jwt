const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connection } = require("./db");

const routes = require("./routes/index");

const app = express();
require("dotenv").config();

const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};
app.use(cors(corsOptions));
app.options("*", cors()); // include before other routes

app.use(express.static(path.join(__dirname, "build")));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.use("/", routes);

connection(process.env.DB_URL).then(() => {
  app.listen(3001, () => {
    console.log("Server is running on port 3001");
  });
});
