const express = require("express");
const router = express.Router();

const { authenticate, admin } = require("../middleware/auth.js");

router.get("/admin", [authenticate, admin], (req, res) => {
    res.status(200).send("Admin accessed");
});

router.get("/user", authenticate, (req, res) => {
    res.status(200).send("User accessed");
});

router.get("/public", (req, res) => {
    res.status(200).send("Public accessed");
});

module.exports = router;