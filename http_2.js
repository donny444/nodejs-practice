const http = require("http");

http.createServer(function (req,res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("Hello HTTP");
    res.end("Hello World");
}).listen(5555);