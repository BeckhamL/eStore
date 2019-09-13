const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");

// Use other JS files
const users = require("./routes/users")
const config = require("./config/database");

// Connecting to database
mongoose.connect(config.database);
mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});

const app = express();
const port = 3000;

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(bodyParser.json());

app.use("/users", users);

app.get("/", function(req,res) {
  res.send("invalid");
});

app.listen(port, function() {
  console.log("Server started");
});