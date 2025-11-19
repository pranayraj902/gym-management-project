const db = require('../config/database');

const Plan = {
    create: async (planData) => {
        const { Plan_Name, duration_months, price, max_sessions_per_week } = planData;
        const query = 'INSERT INTO Membership_Plan (Plan_Name, duration_months, price, max_sessions_per_week) VALUES (?, ?, ?, ?)';
        const values = [Plan_Name, duration_months, price, max_sessions_per_week];
        const [result] = await db.execute(query, values);
        return result.insertId;
    },

    findAll: async () => {
        const query = 'SELECT * FROM Membership_Plan';
        const [rows] = await db.execute(query);
        return rows;
    },

    findById: async (planId) => {
        const query = 'SELECT * FROM Membership_Plan WHERE Plan_id = ?';
        const [rows] = await db.execute(query, [planId]);
        return rows[0];
    },

    update: async (planId, planData) => {
        const { Plan_Name, duration_months, price, max_sessions_per_week } = planData;
        const query = 'UPDATE Membership_Plan SET Plan_Name = ?, duration_months = ?, price = ?, max_sessions_per_week = ? WHERE Plan_id = ?';
        const values = [Plan_Name, duration_months, price, max_sessions_per_week, planId];
        await db.execute(query, values);
    },

    delete: async (planId) => {
        const query = 'DELETE FROM Membership_Plan WHERE Plan_id = ?';
        await db.execute(query, [planId]);
    }
};

module.exports = Plan;
