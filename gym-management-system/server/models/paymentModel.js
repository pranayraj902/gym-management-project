const db = require('../config/database');

const Payment = {
    create: async (paymentData) => {
        const query = 'INSERT INTO Payment (Amount, Payment_Date, Mode, Status, Member_id) VALUES (?, ?, ?, ?, ?)';
        const [result] = await db.execute(query, [paymentData.Amount, paymentData.Payment_Date, paymentData.Mode, paymentData.Status, paymentData.Member_id]);
        return result;
    },

    findById: async (paymentId) => {
        const query = 'SELECT * FROM Payment WHERE Payment_ID = ?';
        const [results] = await db.execute(query, [paymentId]);
        return results[0];
    },

    update: async (paymentId, paymentData) => {
        const query = 'UPDATE Payment SET Amount = ?, Payment_Date = ?, Mode = ?, Status = ?, Member_id = ? WHERE Payment_ID = ?';
        const [result] = await db.execute(query, [paymentData.Amount, paymentData.Payment_Date, paymentData.Mode, paymentData.Status, paymentData.Member_id, paymentId]);
        return result;
    },

    delete: async (paymentId) => {
        const query = 'DELETE FROM Payment WHERE Payment_ID = ?';
        const [result] = await db.execute(query, [paymentId]);
        return result;
    },

    findAll: async () => {
        const query = 'SELECT * FROM Payment ORDER BY Payment_Date DESC, Payment_ID DESC';
        const [results] = await db.execute(query);
        return results;
    }
};

module.exports = Payment;