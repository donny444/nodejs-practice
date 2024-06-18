const jwt = require('jsonwebtoken');

// Secret key for signing the JWT
const secretKey = 'your_secret_key';

// Function to generate a JWT with the user's role
function GenerateToken(userId, role) {
    const payload = {
        sub: userId, // Subject (User ID)
        role: role, // User's role
    };

    // Optional: You can also add other claims like expiration time, issuer, etc.
    // const options = { expiresIn: '1h' };

    const token = jwt.sign(payload, secretKey);
    return token;
}

// Function to verify the JWT and extract the user's role
function VerifyToken(token) {
    try {
        const decoded = jwt.verify(token, secretKey);
        const role = decoded.role; // Extract the user's role from the decoded payload
        return role;
    } catch (err) {
        // Handle JWT verification error
        console.error('JWT verification error:', err.message);
        return null;
    }
}

// Example variables
const userId = '1234'; // Replace with the actual user ID
const userRole = 'admin'; // Replace with the user's role

// Example logs
const token = GenerateToken(userId, userRole); // Replace with the actual JWT token
console.log(token);
const role = VerifyToken(token);
console.log(role);

/* Example file: not being used in this directory */