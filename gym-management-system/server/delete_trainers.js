const db = require('./config/database');

async function deleteTrainers() {
    try {
        console.log('Deleting trainers with IDs 1, 2, and 3...');
        
        const [result] = await db.execute('DELETE FROM Trainer WHERE Trainer_ID IN (1, 2, 3)');
        
        console.log(`✓ Successfully deleted ${result.affectedRows} trainer(s)`);
        
        // Show remaining trainers
        const [trainers] = await db.execute('SELECT * FROM Trainer');
        console.log('\nRemaining trainers:');
        console.table(trainers);
        
        process.exit(0);
    } catch (error) {
        console.error('Error deleting trainers:', error);
        process.exit(1);
    }
}

deleteTrainers();
