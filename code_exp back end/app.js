/// Import relevant libraries ///
const express = require("express");
const controller = require("./controller");
const http  = require("http");
const path = require("path");
const app = express();

/// Middlewares ///
app.use(express.json());//json parser middleware


app.post("/authenticate",controller.authenticate);
app.get("/totalMiles",controller.totalMiles);
app.get("/records",controller.provideRecords);
app.post("/records",controller.addRecords);

//Export app
module.exports =  app;