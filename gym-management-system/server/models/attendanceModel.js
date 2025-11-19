const db = require('../config/database');

const Attendance = {
    // Check if member has an active check-in (no check-out)
    hasActiveCheckIn: async (memberId) => {
        const query = 'SELECT * FROM Attendance_Log WHERE Member_id = ? AND check_out_time IS NULL ORDER BY check_in_time DESC LIMIT 1';
        const [results] = await db.execute(query, [memberId]);
        return results.length > 0 ? results[0] : null;
    },

    createAttendanceLog: async (memberId, checkInTime) => {
        const query = 'INSERT INTO Attendance_Log (Member_id, check_in_time) VALUES (?, ?)';
        const [result] = await db.execute(query, [memberId, checkInTime]);
        return result.insertId;
    },

    updateCheckOutTime: async (logId, checkOutTime) => {
        const query = 'UPDATE Attendance_Log SET check_out_time = ? WHERE log_id = ?';
        const [result] = await db.execute(query, [checkOutTime, logId]);
        return result.affectedRows;
    },

    getAttendanceLogByMemberId: async (memberId) => {
        const query = 'SELECT * FROM Attendance_Log WHERE Member_id = ? ORDER BY check_in_time DESC';
        const [results] = await db.execute(query, [memberId]);
        return results;
    },

    getAllAttendanceLogs: async () => {
        const query = 'SELECT * FROM Attendance_Log ORDER BY check_in_time DESC';
        const [results] = await db.execute(query);
        return results;
    }
};

module.exports = Attendance;