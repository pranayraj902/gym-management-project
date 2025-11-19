const db = require('../config/database');

// Get monthly revenue report
exports.getMonthlyRevenue = async (req, res) => {
    const { month, year } = req.query;
    try {
        let query, params;
        
        if (month && year) {
            query = `SELECT 
                DATE_FORMAT(Payment_Date, '%Y-%m') AS Month,
                COUNT(*) AS Total_Payments,
                SUM(Amount) AS Total_Revenue,
                AVG(Amount) AS Average_Payment
            FROM payment
            WHERE MONTH(Payment_Date) = ? AND YEAR(Payment_Date) = ? AND Status = 'Paid'
            GROUP BY DATE_FORMAT(Payment_Date, '%Y-%m')
            ORDER BY Payment_Date DESC`;
            params = [month, year];
        } else {
            // Get all months' revenue
            query = `SELECT 
                DATE_FORMAT(Payment_Date, '%Y-%m') AS Month,
                COUNT(*) AS Total_Payments,
                SUM(Amount) AS Total_Revenue,
                AVG(Amount) AS Average_Payment
            FROM payment
            WHERE Status = 'Paid'
            GROUP BY DATE_FORMAT(Payment_Date, '%Y-%m')
            ORDER BY Payment_Date DESC
            LIMIT 12`;
            params = [];
        }
        
        const [results] = await db.execute(query, params);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving monthly revenue report', error: error.message });
    }
};

// Get membership report
exports.getMembershipReport = async (req, res) => {
    try {
        const [results] = await db.execute(
            `SELECT 
                m.Name AS Member_Name,
                m.Join_Date,
                m.membership_expiry,
                DATEDIFF(m.membership_expiry, CURDATE()) AS Days_Remaining,
                m.status
            FROM member m
            ORDER BY m.Join_Date DESC`
        );
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving membership report', error: error.message });
    }
};

// Get trainer performance report
exports.getTrainerPerformance = async (req, res) => {
    const { trainerId } = req.params;
    try {
        let query, params;
        
        if (trainerId) {
            query = `SELECT 
                t.Name AS Trainer_Name,
                t.Trainer_ID,
                COUNT(DISTINCT ws.session_id) AS Total_Sessions,
                AVG(ws.current_participants) AS Avg_Participants_Per_Session,
                SUM(ws.duration) / 60 AS Total_Training_Hours
            FROM trainer t
            LEFT JOIN workout_session ws ON t.Trainer_ID = ws.trainer_id
            WHERE t.Trainer_ID = ? AND t.status = 'Active'
            GROUP BY t.Trainer_ID, t.Name`;
            params = [trainerId];
        } else {
            // Get all trainers' performance
            query = `SELECT 
                t.Name AS Trainer_Name,
                t.Trainer_ID,
                COUNT(DISTINCT ws.session_id) AS Total_Sessions,
                AVG(ws.current_participants) AS Avg_Participants_Per_Session,
                SUM(ws.duration) / 60 AS Total_Training_Hours,
                0 AS Total_Members
            FROM trainer t
            LEFT JOIN workout_session ws ON t.Trainer_ID = ws.trainer_id
            WHERE t.status = 'Active'
            GROUP BY t.Trainer_ID, t.Name
            ORDER BY Total_Sessions DESC`;
            params = [];
        }
        
        const [results] = await db.execute(query, params);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving trainer performance report', error: error.message });
    }
};