-- Delete all members and their related data
SET FOREIGN_KEY_CHECKS = 0;

-- Delete from all related tables
DELETE FROM Feedback;
DELETE FROM Attendance_Log;
DELETE FROM Payment;

-- Delete members
DELETE FROM Member;

SET FOREIGN_KEY_CHECKS = 1;
