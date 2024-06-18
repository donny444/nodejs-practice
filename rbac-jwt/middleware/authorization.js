function Admin(req, res, next) {
    const role = req.user.role; // Receive the role from the user object
    if(role !== "admin" /* Check if user's role isn't admin */) {
        return res.status(403).send("You are not authorized to access this resource");
    }
    next();
}

function UserOnly(req, res, next) {
    const role = req.user.role; // Receive the role from the user object
    if(role !== "user" /* Check if user's role isn't user */) {
        return res.status(403).send("You are not authorized to access this resource");
    }
    next();
}

module.exports = { Admin, UserOnly };