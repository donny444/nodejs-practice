const express = require("express");
const router = express.Router();

const { Authenticate } = require("../middleware/authentication.js");
const { Admin, UserOnly } = require("../middleware/authorization.js");

router.get("/admin", [Authenticate, Admin] /* Authenticate the user, then check for the admin role */, (req, res) => {
    res.status(200).send("Admin accessed");
}); // This route is only accessible to users with the role of admin

router.get("/user", Authenticate, (req, res) => {
    res.status(200).send("User accessed");
}); // This route is accessible to all authenticated users

router.get("/user-only", [Authenticate, UserOnly] /* Authenticate the user, then check for the user role */, (req, res) => {
    res.status(200).send("User only accessed");
}); // This route is only accessible to users with the role of user

router.get("/guest", (req, res) => {
    res.status(200).send("Guest accessed");
}); // This route is accessible to all users

module.exports = router;