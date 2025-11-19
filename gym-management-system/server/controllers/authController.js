const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// JWT Secret - In production, use environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'gym-management-secret-key-2025';

// Register new user
exports.register = async (req, res) => {
    try {
        const { username, email, password, full_name, role } = req.body;

        // Validate input
        if (!username || !email || !password || !full_name) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUserByEmail = await User.findByEmail(email);
        if (existingUserByEmail) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const existingUserByUsername = await User.findByUsername(username);
        if (existingUserByUsername) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create user
        const userId = await User.create({
            username,
            email,
            password: hashedPassword,
            full_name,
            role: role || 'staff'
        });

        // Generate JWT token
        const token = jwt.sign(
            { userId, email, role: role || 'staff' },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                user_id: userId,
                username,
                email,
                full_name,
                role: role || 'staff'
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if user is active
        if (user.status !== 'Active') {
            return res.status(403).json({ message: 'Account is inactive. Please contact administrator.' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.user_id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                full_name: user.full_name,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

// Get current user (for authentication check)
exports.getCurrentUser = async (req, res) => {
    try {
        // User ID comes from auth middleware
        const user = await User.findById(req.user.userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};

// Logout (client-side will remove token)
exports.logout = async (req, res) => {
    res.status(200).json({ message: 'Logout successful' });
};
