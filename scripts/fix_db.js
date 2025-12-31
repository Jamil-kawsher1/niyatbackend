const mysql = require('mysql2/promise');
require('dotenv').config();

async function cleanUp() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || 'password',
            database: process.env.DB_NAME || 'niyat',
            port: process.env.DB_PORT || 3306
        });

        console.log('Connected to database.');

        // Delete users with NULL emails to allow the ALTER TABLE to succeed
        const [result] = await connection.execute('DELETE FROM Users WHERE email IS NULL');
        console.log(`Deleted ${result.affectedRows} users with NULL emails.`);

        await connection.end();
    } catch (error) {
        console.error('Error cleaning up:', error);
    }
}

cleanUp();
