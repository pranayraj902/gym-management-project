const db = require('../config/database');

const Trainer = {
    getAllTrainers: async () => {
        const [rows] = await db.query('SELECT * FROM Trainer WHERE status = "Active"');
        return rows;
    },

    getTrainerById: async (trainerId) => {
        const [rows] = await db.query('SELECT * FROM Trainer WHERE Trainer_ID = ?', [trainerId]);
        return rows[0];
    },

    createTrainer: async (trainerData) => {
        const { Name, Email, Phone, Salary } = trainerData;
        const [result] = await db.query('INSERT INTO Trainer (Name, Email, Phone, Salary) VALUES (?, ?, ?, ?)', [Name, Email, Phone, Salary]);
        return result.insertId;
    },

    updateTrainer: async (trainerId, trainerData) => {
        const { Name, Email, Phone, Salary } = trainerData;
        await db.query('UPDATE Trainer SET Name = ?, Email = ?, Phone = ?, Salary = ? WHERE Trainer_ID = ?', [Name, Email, Phone, Salary, trainerId]);
    },

    deleteTrainer: async (trainerId) => {
        await db.query('UPDATE Trainer SET status = "Inactive" WHERE Trainer_ID = ?', [trainerId]);
    }
};

module.exports = Trainer;