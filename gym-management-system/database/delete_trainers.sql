-- Delete trainers except ADARSH (ID: 4)
-- This will remove Sreejith (ID: 1), Sourabh (ID: 2), and Sourabh (ID: 3)

USE gym_management_system;

DELETE FROM Trainer WHERE Trainer_ID IN (1, 2, 3);

-- Verify remaining trainers
SELECT * FROM Trainer;
