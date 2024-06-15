const express = require("express");
const router = express.Router();

const { Authenticate } = require("../middleware/authentication.js");
const { Admin, UserOnly } = require("../middleware/authorization.js");

router.get("/admin", [Authenticate, Admin], (req, res) => {
    res.status(200).send("Admin accessed");
});

router.get("/user", Authenticate, (req, res) => {
    res.status(200).send("User accessed");
});

router.get("/user-only", [Authenticate, UserOnly], (req, res) => {
    res.status(200).send("User only accessed");
});

router.get("/guest", (req, res) => {
    res.status(200).send("Guest accessed");
});

module.exports = router;