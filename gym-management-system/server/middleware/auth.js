const jwt = require('jsonwebtoken');

// JWT Secret - should match the one in authController
const JWT_SECRET = process.env.JWT_SECRET || 'gym-management-secret-key-2025';

const authMiddleware = (req, res, next) => {
    try {
        // Get token from Authorization header (Bearer token)
        const authHeader = req.headers['authorization'];
        
        if (!authHeader) {
            return res.status(403).json({ message: 'No token provided!' });
        }

        // Extract token (format: "Bearer <token>")
        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

        if (!token) {
            return res.status(403).json({ message: 'No token provided!' });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Add user info to request
        req.user = {
            userId: decoded.userId,
            email: decoded.email,
            role: decoded.role
        };
        
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired!' });
        }
        return res.status(401).json({ message: 'Unauthorized! Invalid token.' });
    }
};

module.exports = authMiddleware;