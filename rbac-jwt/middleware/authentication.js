require("dotenv").config();
const jwt = require('jsonwebtoken');

function Authenticate(req, res, next) {
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

module.exports = { Authenticate };