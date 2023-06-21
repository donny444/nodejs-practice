const http = require("http");
const fs = require("fs");

var date = new Date();
var year = date.getFullYear();
var month = date.getMonth();
var day = date.getDate();

var data = "Checked on " + day + "/" + month + "/" + year;

fs.appendFile('check_on_run.txt', data, function(err) {
    if (err) throw err;
    console.log("Date checked!");
});