// Dependencies
const http = require("http");
const fs = require("fs");
const path = require("path");
const express = require("express");

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Ensuring static files, like the js and css, can be used
app.use(express.static('public'));

//Setting up the location of the routes to be used
require("routes")(app);
require("htmlroutes")(app);


// Starting the server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});