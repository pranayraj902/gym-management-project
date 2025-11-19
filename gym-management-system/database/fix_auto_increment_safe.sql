-- Disable foreign key checks temporarily
SET FOREIGN_KEY_CHECKS = 0;

-- Fix AUTO_INCREMENT for all primary keys
ALTER TABLE Member MODIFY Member_id INT AUTO_INCREMENT;
ALTER TABLE Trainer MODIFY Trainer_ID INT AUTO_INCREMENT;
ALTER TABLE Workout_Session MODIFY session_id INT AUTO_INCREMENT;
ALTER TABLE Payment MODIFY Payment_ID INT AUTO_INCREMENT;
ALTER TABLE Equipment MODIFY equipment_id INT AUTO_INCREMENT;
ALTER TABLE Feedback MODIFY feedback_id INT AUTO_INCREMENT;
ALTER TABLE Attendance_Log MODIFY log_id INT AUTO_INCREMENT;
ALTER TABLE Membership_Plan MODIFY Plan_id INT AUTO_INCREMENT;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

SELECT 'All tables fixed successfully!' AS Status;
