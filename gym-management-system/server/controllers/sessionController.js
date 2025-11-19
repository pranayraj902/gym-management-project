const db = require('../config/database');

// Get all workout sessions
exports.getAllSessions = async (req, res) => {
    try {
        const [sessions] = await db.query('SELECT * FROM Workout_Session ORDER BY date DESC');
        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving sessions', error: error.message });
    }
};

// Get a specific workout session by ID
exports.getSessionById = async (req, res) => {
    const { id } = req.params;
    try {
        const [session] = await db.query('SELECT * FROM Workout_Session WHERE session_id = ?', [id]);
        if (session.length === 0) {
            return res.status(404).json({ message: 'Session not found' });
        }
        res.status(200).json(session[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving session', error });
    }
};

// Create a new workout session
exports.createSession = async (req, res) => {
    const { date, duration, type, calories_burned, trainer_id, max_capacity, current_participants } = req.body;
    try {
        const [result] = await db.query('INSERT INTO Workout_Session (date, duration, type, calories_burned, trainer_id, max_capacity, current_participants) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [date, duration, type, calories_burned, trainer_id, max_capacity, current_participants || 0]);
        res.status(201).json({ message: 'Session created successfully', sessionId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating session', error: error.message });
    }
};

// Update a workout session
exports.updateSession = async (req, res) => {
    const { id } = req.params;
    const { date, duration, type, calories_burned, trainer_id, max_capacity, current_participants } = req.body;
    try {
        const [result] = await db.query('UPDATE Workout_Session SET date = ?, duration = ?, type = ?, calories_burned = ?, trainer_id = ?, max_capacity = ?, current_participants = ? WHERE session_id = ?', 
            [date, duration, type, calories_burned, trainer_id, max_capacity, current_participants || 0, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Session not found' });
        }
        res.status(200).json({ message: 'Session updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating session', error: error.message });
    }
};

// Delete a workout session
exports.deleteSession = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM Workout_Session WHERE session_id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Session not found' });
        }
        res.status(200).json({ message: 'Session deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting session', error });
    }
};