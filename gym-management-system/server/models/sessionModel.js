const db = require('../config/database');

const Session = {
    createSession: async (sessionData) => {
        const { date, duration, type, calories_burned, trainer_id, max_capacity, current_participants } = sessionData;
        const query = 'INSERT INTO Workout_Session (date, duration, type, calories_burned, trainer_id, max_capacity, current_participants) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [date, duration, type, calories_burned, trainer_id, max_capacity, current_participants || 0];
        const [result] = await db.execute(query, values);
        return result.insertId;
    },

    getAllSessions: async () => {
        const query = 'SELECT * FROM Workout_Session ORDER BY date DESC';
        const [rows] = await db.execute(query);
        return rows;
    },

    getSessionById: async (sessionId) => {
        const query = 'SELECT * FROM Workout_Session WHERE session_id = ?';
        const [rows] = await db.execute(query, [sessionId]);
        return rows[0];
    },

    updateSession: async (sessionId, sessionData) => {
        const { date, duration, type, calories_burned, trainer_id, max_capacity, current_participants } = sessionData;
        const query = 'UPDATE Workout_Session SET date = ?, duration = ?, type = ?, calories_burned = ?, trainer_id = ?, max_capacity = ?, current_participants = ? WHERE session_id = ?';
        const values = [date, duration, type, calories_burned, trainer_id, max_capacity, current_participants || 0, sessionId];
        await db.execute(query, values);
    },

    deleteSession: async (sessionId) => {
        const query = 'DELETE FROM Workout_Session WHERE session_id = ?';
        await db.execute(query, [sessionId]);
    }
};

module.exports = Session;