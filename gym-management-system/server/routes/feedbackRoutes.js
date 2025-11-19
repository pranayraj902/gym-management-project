const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Route to get all feedback
router.get('/', feedbackController.getAllFeedback);

// Route to submit new feedback
router.post('/', feedbackController.submitFeedback);

// Route to get feedback by ID
router.get('/:id', feedbackController.getFeedbackById);

// Route to update feedback by ID
router.put('/:id', feedbackController.updateFeedback);

// Route to delete feedback by ID
router.delete('/:id', feedbackController.deleteFeedback);

module.exports = router;