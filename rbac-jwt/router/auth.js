require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const connection = require("../connection.js");

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if(!(username && email && password)) {
            return res.status(400).send("All input is required");
        }
        connection.query(
            "SELECT * FROM users WHERE username = ? OR email = ?",
            [username, email],
            async (err, results) => {
                if(err) {
                    console.error(err);
                }
                if(results.length > 0) {
                    return res.status(409).send("User already exists");
                }
                else {
                    const hashedPassword = await bcrypt.hash(password, 10);
                    connection.query(
                        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
                        [username, email, hashedPassword] /* There's no users role in the database */,
                        (err, results) => {
                            if(err) {
                                console.error(err);
                            }

                            return res.status(201).send("User registered successfully");
                        }
                    )
                }
            }
        )
    } catch(err) {
        console.error(err);
    }
})

router.post("/login", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if(!((username || email) && password) /* Login using username or email */) {
            return res.status(400).send("All input is required");
        }
        connection.query(
            "SELECT * FROM users WHERE username = ? OR email = ?",
            [username, email],
            async (err, results) => {
                if(err) {
                    return res.status(500).send("Server error");
                }
                if (results.length > 0 && (await bcrypt.compare(password, results[0].password))) {
                    const payload = {
                        id: results[0].id,
                        role: "user" // assign role property to the payload
                    }
                    const token = jwt.sign(
                        payload,
                        process.env.JWT_SECRET,
                        {
                            expiresIn: 60 * 60
                        }
                    )
                    results[0].token = token; // add token property to the result object
                    return res.status(200).json(results[0]);
                }
                else {
                    return res.status(401).send("Invalid Credentials");
                }
            }
        )
    } catch(err) {
        console.error(err);
    }
})

router.post("/admin-login", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if(!((username || email) && password) /* Login using username or email */) {
            return res.status(400).send("All input is required");
        }
        connection.query(
            "SELECT * FROM admins WHERE username = ? OR email = ?" /* Check the admins table separate from users table */,
            [username, email],
            async (err, results) => {
                if(err) {
                    return res.status(500).send("Server error");
                }
                if (results.length > 0 && (await bcrypt.compare(password, results[0].password))) {
                    const payload = {
                        id: results[0].id,
                        role: "admin" // assign role property to the payload
                    }
                    const token = jwt.sign(
                        payload,
                        process.env.JWT_SECRET,
                        {
                            expiresIn: 60 * 60
                        }
                    )
                    results[0].token = token; // add token property to the result object
                    return res.status(200).json(results[0]);
                }
                else {
                    return res.status(401).send("Invalid Credentials");
                }
            }
        )
    } catch(err) {
        console.error(err);
    }
})

module.exports = router;