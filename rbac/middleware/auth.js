const ROLES = {
    ADMIN: 'admin',
    USER: 'user',
    GUEST: 'guest'
}; // Mock-up roles data

const userRoles = {
    '12345': ROLES.ADMIN,
    '67890': ROLES.USER,
    '24680': ROLES.GUEST
}; // Mock-up role for each user id

function authorize(roles) {
    return (req, res, next) => {
        const userId = req.query.userId; // Assuming you have already authenticated the user and attached the userId to the request object
        const userRole = userRoles[userId];

        if (roles.includes(userRole)) {
            next(); // User is authorized, proceed to the next middleware or route handler
        } else {
            res.status(403).json({ message: 'Forbidden' });
        }
    };
}

module.exports = { ROLES, authorize };