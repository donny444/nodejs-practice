var http = require("http");
var fs = require("fs");

http.createServer(function (req, res) {
    fs.readFile("../html-practice/contact_donny.html", function(err, data) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(data);
        return res.end();
    });
    fs.appendFile("demo.txt", "appendtext ", function (err) {
        if (err) throw err;
        console.log("Saved!");
    });
    fs.open("demo2.txt", "w", function(err, file) {
        if (err) throw err;
        console.log("Saved!");
    });
    fs.writeFile("demo3.txt", "writefile", function (err) {
        if (err) throw err;
        console.log("Saved!");
    });
    fs.unlink("demo4.txt", function (err) {
        if (err) throw err;
        console.log("Deleted!");
    });
    fs.rename("dem5.txt", "demo5.txt", function (err) {
        if (err) throw err;
        console.log("Renamed!");
    });
}).listen(8000);