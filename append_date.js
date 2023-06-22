const http = require("http");
const fs = require("fs");

var date = new Date();
var year = date.getFullYear().toString();
var month = date.getMonth().toString();
var day = date.getDate().toString();

var data = "Checked on " + day + "/" + month + "/" + year;

fs.appendFile('check_on_run.txt', data, function(err) {
    if (err) throw err;
    console.log("Date checked!");
});