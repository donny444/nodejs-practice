const express = require("express");
const router = express.Router();

const { ROLES, authorize } = require("./middleware/auth.js");

// Example routes with RBAC
router.get('/admin-only', authorize([ROLES.ADMIN]), (req, res) => {
    // Route logic for admin-only resource
    res.status(200).json({ message: "Admin accessed"});
});

router.get('/user-data', authorize([ROLES.ADMIN, ROLES.USER]), (req, res) => {
    // Route logic for user data resource
    res.status(200).json({ message: "User accessed"});
});

router.get('/public-data', authorize([ROLES.ADMIN, ROLES.USER, ROLES.GUEST]), (req, res) => {
    // Route logic for public data resource
    res.status(200).json({ message: "Guest accessed"});
});

module.exports = router;