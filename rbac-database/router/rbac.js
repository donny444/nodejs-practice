const express = require("express");
const router = express.Router();

const { authenticate, admin, userOnly } = require("../middleware/auth.js");

router.get("/admin", [authenticate, admin], (req, res) => {
    res.status(200).send("Admin accessed");
}); // Only authenticated users with admin role can access this route

router.get("/user", authenticate, (req, res) => {
    res.status(200).send("User accessed");
}); // Only authenticated users can access this route

router.get("/user-only", [authenticate, userOnly], (req, res) => {
    res.status(200).send("User only accessed");
}); // Only authenticated users with user role can access this route

router.get("/public", (req, res) => {
    res.status(200).send("Public accessed");
});

module.exports = router;