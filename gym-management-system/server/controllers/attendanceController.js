const Attendance = require('../models/attendanceModel');

// Get all attendance logs or logs for a specific member
exports.getAttendanceLog = async (req, res) => {
    try {
        const memberId = req.params.memberId || req.query.memberId;
        
        if (memberId) {
            const attendanceLog = await Attendance.getAttendanceLogByMemberId(memberId);
            res.status(200).json(attendanceLog);
        } else {
            const allLogs = await Attendance.getAllAttendanceLogs();
            res.status(200).json(allLogs);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving attendance log', error: error.message });
    }
};

// Check in a member
exports.checkInMember = async (req, res) => {
    try {
        const { memberId } = req.body;
        
        // Check if member already has an active check-in
        const activeCheckIn = await Attendance.hasActiveCheckIn(memberId);
        if (activeCheckIn) {
            return res.status(400).json({ 
                message: 'Member is already checked in', 
                activeLogId: activeCheckIn.log_id,
                checkInTime: activeCheckIn.check_in_time
            });
        }
        
        const checkInTime = new Date();
        const logId = await Attendance.createAttendanceLog(memberId, checkInTime);
        res.status(201).json({ message: 'Check-in successful', logId, checkInTime });
    } catch (error) {
        res.status(500).json({ message: 'Error checking in member', error: error.message });
    }
};

// Check out a member
exports.checkOutMember = async (req, res) => {
    try {
        const { memberId, logId } = req.body;
        const checkOutTime = new Date();
        const affectedRows = await Attendance.updateCheckOutTime(logId, checkOutTime);

        if (affectedRows === 0) {
            return res.status(404).json({ message: 'No check-in record found for this member' });
        }

        res.status(200).json({ message: 'Check-out successful', logId, checkOutTime });
    } catch (error) {
        res.status(500).json({ message: 'Error checking out member', error: error.message });
    }
};