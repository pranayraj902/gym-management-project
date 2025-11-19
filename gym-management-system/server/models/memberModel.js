const db = require('../config/database');

const Member = {
    create: async (memberData) => {
        const { Name, Gender, Phone_Num, Address, Join_Date, status, membership_expiry } = memberData;
        const query = 'INSERT INTO Member (Name, Gender, Phone_Num, Address, Join_Date, status, membership_expiry) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [Name, Gender, Phone_Num, Address, Join_Date, status, membership_expiry];
        const [result] = await db.execute(query, values);
        return result.insertId;
    },

    findAll: async () => {
        const query = 'SELECT * FROM Member';
        const [rows] = await db.execute(query);
        return rows;
    },

    findById: async (memberId) => {
        const query = 'SELECT * FROM Member WHERE Member_id = ?';
        const [rows] = await db.execute(query, [memberId]);
        return rows[0];
    },

    update: async (memberId, memberData) => {
        const { Name, Gender, Phone_Num, Address, status, membership_expiry } = memberData;
        const query = 'UPDATE Member SET Name = ?, Gender = ?, Phone_Num = ?, Address = ?, status = ?, membership_expiry = ? WHERE Member_id = ?';
        const values = [Name, Gender, Phone_Num, Address, status, membership_expiry, memberId];
        await db.execute(query, values);
    },

    delete: async (memberId) => {
        // Delete related records first to avoid foreign key constraint errors
        // Use try-catch for each table in case some don't exist
        try {
            // Delete attendance logs (confirmed to exist)
            try {
                await db.execute('DELETE FROM Attendance_Log WHERE Member_id = ?', [memberId]);
            } catch (err) {
                console.log('Skipping Attendance_Log:', err.message);
            }
            
            // Delete payments (confirmed to exist)
            try {
                await db.execute('DELETE FROM Payment WHERE Member_id = ?', [memberId]);
            } catch (err) {
                console.log('Skipping Payment:', err.message);
            }
            
            // Delete feedback (confirmed to exist)
            try {
                await db.execute('DELETE FROM Feedback WHERE M = ?', [memberId]);
            } catch (err) {
                console.log('Skipping Feedback:', err.message);
            }
            
            // Try other relationship tables
            const optionalTables = [
                'Participates_in',
                'Trains_For',
                'Subscribes_to',
                'Gives',
                'Uses',
                'makes'
            ];
            
            for (const table of optionalTables) {
                try {
                    await db.execute(`DELETE FROM ${table} WHERE Member_id = ?`, [memberId]);
                } catch (err) {
                    console.log(`Skipping ${table}:`, err.message);
                }
            }
            
            // Now delete the member
            const query = 'DELETE FROM Member WHERE Member_id = ?';
            await db.execute(query, [memberId]);
            
        } catch (error) {
            console.error('Error in delete cascade:', error);
            throw error;
        }
    }
};

module.exports = Member;