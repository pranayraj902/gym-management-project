-- Insert Sample Membership Plans
USE gym_management_system;

-- Clear existing plans (if any)
DELETE FROM Membership_Plan;

-- Insert membership plans
INSERT INTO Membership_Plan (Plan_id, Plan_Name, duration_months, price, max_sessions_per_week) VALUES
(1, 'Basic Monthly', 1, 999.00, 3),
(2, 'Standard Quarterly', 3, 2499.00, 5),
(3, 'Premium Semi-Annual', 6, 4499.00, 7),
(4, 'Platinum Annual', 12, 7999.00, 10),
(5, 'Student Monthly', 1, 699.00, 3),
(6, 'Senior Citizen Quarterly', 3, 1999.00, 4);

-- Verify insertion
SELECT * FROM Membership_Plan;
