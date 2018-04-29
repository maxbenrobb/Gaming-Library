//Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const logger = require("morgan");
const mongoose = require("mongoose");
const db = require("./models");
var passport = require('passport');

require("./config/passport")(passport);

const PORT = process.env.PORT || 3000;

const app = express();
// Required for passport
app.use(session({secret: "keyboard cat"}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));


// Import Routes
require("./controllers/controller.js")(app, passport);


const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/VGDB";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.listen(PORT, function() {
  console.log("App running on port " + PORT);
});
