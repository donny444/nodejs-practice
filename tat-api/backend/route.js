const express = require("express");
const tat = require("./controller.js");
const route = express.Router();

route.get("/", tat);

module.exports = route;