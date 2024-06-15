const http = require("http");
const express = require('express');
const connection = require("./connection.js");

connection.connect((err) => {
    if (err) {
        console.log("Error connecting to database");
        return;
    }
    console.log("Connected to database");
});

const app = express();
const server = http.createServer(app);
const port = 5000;

app.use(express.json());

const authRoutes = require("./router/auth.js");
const rolesRoutes = require("./router/roles.js");

app.use("/auth", authRoutes);
app.use("/roles", rolesRoutes);

server.listen(port, () => console.log(`Server is running on port ${port}`));