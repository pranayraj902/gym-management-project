const db = require('../config/database');

const User = {
    // Create new user
    create: async (userData) => {
        const { username, email, password, full_name, role } = userData;
        const query = 'INSERT INTO users (username, email, password, full_name, role) VALUES (?, ?, ?, ?, ?)';
        const [result] = await db.execute(query, [username, email, password, full_name, role || 'staff']);
        return result.insertId;
    },

    // Find user by email
    findByEmail: async (email) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        const [results] = await db.execute(query, [email]);
        return results[0];
    },

    // Find user by username
    findByUsername: async (username) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        const [results] = await db.execute(query, [username]);
        return results[0];
    },

    // Find user by ID
    findById: async (userId) => {
        const query = 'SELECT user_id, username, email, full_name, role, status, created_at FROM users WHERE user_id = ?';
        const [results] = await db.execute(query, [userId]);
        return results[0];
    },

    // Get all users
    getAll: async () => {
        const query = 'SELECT user_id, username, email, full_name, role, status, created_at FROM users ORDER BY created_at DESC';
        const [results] = await db.execute(query);
        return results;
    },

    // Update user
    update: async (userId, userData) => {
        const { email, full_name, role, status } = userData;
        const query = 'UPDATE users SET email = ?, full_name = ?, role = ?, status = ? WHERE user_id = ?';
        const [result] = await db.execute(query, [email, full_name, role, status, userId]);
        return result.affectedRows;
    },

    // Delete user
    delete: async (userId) => {
        const query = 'DELETE FROM users WHERE user_id = ?';
        const [result] = await db.execute(query, [userId]);
        return result.affectedRows;
    }
};

module.exports = User;
