const db = require('../config/database');

const Equipment = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM Equipment');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM Equipment WHERE equipment_id = ?', [id]);
        return rows[0];
    },

    create: async (equipmentData) => {
        const { name, type, availability, maintenance_dates, last_maintenance, purchase_date } = equipmentData;
        const [result] = await db.query(
            'INSERT INTO Equipment (name, type, availability, maintenance_dates, last_maintenance, purchase_date) VALUES (?, ?, ?, ?, ?, ?)',
            [name, type, availability, maintenance_dates, last_maintenance, purchase_date]
        );
        return result.insertId;
    },

    update: async (id, equipmentData) => {
        const { name, type, availability, maintenance_dates, last_maintenance, purchase_date } = equipmentData;
        await db.query(
            'UPDATE Equipment SET name = ?, type = ?, availability = ?, maintenance_dates = ?, last_maintenance = ?, purchase_date = ? WHERE equipment_id = ?',
            [name, type, availability, maintenance_dates, last_maintenance, purchase_date, id]
        );
    },

    delete: async (id) => {
        await db.query('DELETE FROM Equipment WHERE equipment_id = ?', [id]);
    }
};

module.exports = Equipment;