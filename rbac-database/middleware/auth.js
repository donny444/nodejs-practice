require("dotenv").config();
const jwt = require('jsonwebtoken');
const connection = require('../connection.js');

function authenticate(req, res, next) {
    const token = req.headers["x-access-token"];
    if(!token) {
        return res.status(403).send("A token is required for authentication");
    } else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch(err) {
            console.error(err);
            res.status(401).send("Invalid token");
        }
    }
}

function admin(req, res, next) {
    const id = req.user.id;

    connection.query(
        "SELECT role FROM users WHERE id = ?",
        [id],
        (err, result) => {
            if(err) {
                console.error(err);
                return res.status(500).send("Server error");
            }
            if(result[0].role !== "admin") {
                return res.status(403).send("You are not authorized to access this resource");
            }
            next();
        }
    )
}

module.exports = { authenticate, admin };