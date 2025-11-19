const express = require('express');
const { checkInMember, checkOutMember, getAttendanceLog } = require('../controllers/attendanceController');

const router = express.Router();

// Route to check in a member
router.post('/checkin', checkInMember);

// Route to check out a member
router.post('/checkout', checkOutMember);

// Route to get attendance log
router.get('/', getAttendanceLog);

module.exports = router;