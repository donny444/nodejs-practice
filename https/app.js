const https = require("https");
const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");

const options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert")
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/mssg", (req, res) => {
    const message = req.body.message;
    res.send("Your message is: " + message);
});

https.createServer(options, app).listen(5000, () => {
    console.log("Server is running on port 5000");
});