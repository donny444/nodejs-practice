const http = require("http");
const express = require('express');

const app = express();
const server = http.createServer(app);
const port = 5000;

const routes = require("./routes.js");

app.use(express.json());

app.use("/rbac", routes); // RBAC: Role Based Access Control

server.listen(port, () => console.log(`Server is running on port ${port}`));