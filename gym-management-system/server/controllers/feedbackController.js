const Feedback = require('../models/feedbackModel');

// Get all feedback
exports.getAllFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.getAll();
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving feedback', error: error.message });
    }
};

// Submit new feedback
exports.submitFeedback = async (req, res) => {
    const { comments, rating, Member_id } = req.body;
    const feedback_date = new Date();

    try {
        const result = await Feedback.create({ comments, rating, feedback_date, M: Member_id });
        const newFeedback = await Feedback.getById(result.insertId);
        res.status(201).json(newFeedback);
    } catch (error) {
        res.status(500).json({ message: 'Error submitting feedback', error: error.message });
    }
};

// Get feedback by ID
exports.getFeedbackById = async (req, res) => {
    const { id } = req.params;

    try {
        const feedback = await Feedback.getById(id);
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving feedback', error: error.message });
    }
};

// Update feedback
exports.updateFeedback = async (req, res) => {
    const { id } = req.params;
    const { comments, rating } = req.body;

    try {
        await Feedback.update(id, { comments, rating });
        const updatedFeedback = await Feedback.getById(id);
        if (!updatedFeedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        res.status(200).json(updatedFeedback);
    } catch (error) {
        res.status(500).json({ message: 'Error updating feedback', error: error.message });
    }
};

// Delete feedback
exports.deleteFeedback = async (req, res) => {
    const { id } = req.params;

    try {
        await Feedback.delete(id);
        res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting feedback', error: error.message });
    }
};