const https = require("https");

https.createServer((req, res) => {
    res.writeHead(200);
    res.end("Hello world\n");
}).listen(8000);