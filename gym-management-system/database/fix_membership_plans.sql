-- Fix and populate Membership_Plan table
USE gym_management_system;

-- Check if table exists and show structure
DESCRIBE Membership_Plan;

-- Insert membership plans with AUTO_INCREMENT for Plan_id
INSERT INTO Membership_Plan (Plan_Name, duration_months, price, max_sessions_per_week) VALUES
('Basic Monthly', 1, 999.00, 3),
('Standard Quarterly', 3, 2499.00, 5),
('Premium Semi-Annual', 6, 4499.00, 7),
('Platinum Annual', 12, 7999.00, 10),
('Student Monthly', 1, 699.00, 3),
('Senior Citizen Quarterly', 3, 1999.00, 4);

-- Show results
SELECT * FROM Membership_Plan;
