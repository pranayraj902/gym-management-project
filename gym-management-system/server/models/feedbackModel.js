const db = require('../config/database');

const Feedback = {
    create: async (feedbackData) => {
        const query = 'INSERT INTO Feedback (comments, rating, feedback_date, M) VALUES (?, ?, ?, ?)';
        const [result] = await db.execute(query, [feedbackData.comments, feedbackData.rating, feedbackData.feedback_date, feedbackData.M]);
        return result;
    },

    getAll: async () => {
        const query = 'SELECT * FROM Feedback ORDER BY feedback_date DESC';
        const [results] = await db.execute(query);
        return results;
    },

    getById: async (feedbackId) => {
        const query = 'SELECT * FROM Feedback WHERE feedback_id = ?';
        const [results] = await db.execute(query, [feedbackId]);
        return results[0];
    },

    update: async (feedbackId, feedbackData) => {
        const query = 'UPDATE Feedback SET comments = ?, rating = ? WHERE feedback_id = ?';
        const [result] = await db.execute(query, [feedbackData.comments, feedbackData.rating, feedbackId]);
        return result;
    },

    delete: async (feedbackId) => {
        const query = 'DELETE FROM Feedback WHERE feedback_id = ?';
        const [result] = await db.execute(query, [feedbackId]);
        return result;
    }
};

module.exports = Feedback;