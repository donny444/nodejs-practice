function Admin(req, res, next) {
    const role = req.user.role;
    if(role !== "admin") {
        return res.status(403).send("You are not authorized to access this resource");
    }
    next();
}

function UserOnly(req, res, next) {
    const role = req.user.role;
    if(role !== "user") {
        return res.status(403).send("You are not authorized to access this resource");
    }
    next();
}

module.exports = { Admin, UserOnly };