/* CONNECTION */
const express = require('express');
const exphbs  = require('express-handlebars');
const logger = require("morgan");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");
const PORT = 3000;
const User = require("./userModel.js");
const app = express();
const connection = mongoose.connect("mongodb://localhost/userdb", { useNewUrlParser: true });

/* MIDDLEWARE */
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

/* ROUTES */

app.post("/submit", function(req, res) {
  // Create a new user using req.body
  User.create(req.body)
    .then(function(dbUser) {
      // If saved successfully, send the the new User document to the client
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurs, send the error to the client
      res.json(err);
    });
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
