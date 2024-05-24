const ROLES = {
    ADMIN: 'admin',
    USER: 'user',
    GUEST: 'guest'
};

const userRoles = {
    '12345': ROLES.ADMIN,
    '67890': ROLES.USER,
    '24680': ROLES.GUEST
};

function authorize(roles) {
    return (req, res, next) => {
        const userId = req.userId; // Assuming you have already authenticated the user and attached the userId to the request object
        const userRole = userRoles[userId];

        if (roles.includes(userRole)) {
            next(); // User is authorized, proceed to the next middleware or route handler
        } else {
            res.status(403).json({ message: 'Forbidden' });
        }
    };
}

// Example routes with RBAC
router.get('/admin-only', authorize([ROLES.ADMIN]), (req, res) => {
    // Route logic for admin-only resource
});

router.get('/user-data', authorize([ROLES.ADMIN, ROLES.USER]), (req, res) => {
    // Route logic for user data resource
});

router.get('/public-data', authorize([ROLES.ADMIN, ROLES.USER, ROLES.GUEST]), (req, res) => {
    // Route logic for public data resource
});