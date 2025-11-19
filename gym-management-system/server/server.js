require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const memberRoutes = require('./routes/memberRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const reportRoutes = require('./routes/reportRoutes');
const planRoutes = require('./routes/planRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Test database connection
const db = require('./config/database');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/plans', planRoutes);

// Health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Error handler middleware (should be last)
app.use(errorHandler);

// Start server and handle startup errors (like EADDRINUSE)
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
});

// Handle server 'error' events so we can show a friendly message instead of an uncaught exception
server.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE') {
        console.error(`\nERROR: Port ${PORT} is already in use.`);
        console.error(' - Either stop the process using the port or set a different PORT in your .env file (e.g. PORT=5001).');
        console.error(' - On Windows you can run: netstat -ano | findstr :' + PORT + '  then taskkill /PID <pid> /F');
        process.exit(1);
    }
    console.error('Server error:', err);
    process.exit(1);
});

// Global handlers for unhandled rejections and uncaught exceptions to make diagnostics clearer
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Recommended: crash the process in production so a process manager can restart it
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception thrown:', err);
    // Recommended: crash the process in production so a process manager can restart it
    process.exit(1);
});