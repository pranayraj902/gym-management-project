const express = require('express');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

// Get all workout sessions
router.get('/', sessionController.getAllSessions);

// Get a specific workout session by ID
router.get('/:id', sessionController.getSessionById);

// Create a new workout session
router.post('/', sessionController.createSession);

// Update an existing workout session
router.put('/:id', sessionController.updateSession);

// Delete a workout session
router.delete('/:id', sessionController.deleteSession);

module.exports = router;