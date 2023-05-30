const http = require('http');
const name = require("./myfirstmodule");

http.createServer(function (req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("The maker name is: " + name.myName());
    res.end();
}).listen(444);