const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log('--- Database Connection Test ---');
console.log('Environment Variables Loaded:');
console.log(`DB_HOST: ${process.env.DB_HOST}`);
console.log(`DB_PORT: ${process.env.DB_PORT}`);
console.log(`DB_NAME: ${process.env.DB_NAME}`);
console.log(`DB_USER: ${process.env.DB_USER}`);
console.log(`DB_PASS: ${process.env.DB_PASS ? '******' : '(not set)'}`);

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: console.log // Show SQL logs for debugging
    }
);

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('\n✅ Connection has been established successfully.');
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Unable to connect to the database:');
        console.error('Name:', error.name);
        console.error('Message:', error.message);

        if (error.original) {
            console.error('Original Error Code:', error.original.code);
            console.error('Original Error No:', error.original.errno);
            console.error('Original Sql Message:', error.original.sqlMessage);
        }

        console.log('\n--- Troubleshooting ---');
        if (error.original && error.original.code === 'ER_ACCESS_DENIED_ERROR') {
            console.log('-> This is an authentication error.');
            console.log('-> Verify DB_USER and DB_PASS in .env');
            console.log('-> Verify the user has privileges for this host (localhost vs 127.0.0.1).');
        } else if (error.original && error.original.code === 'ECONNREFUSED') {
            console.log('-> The database server is not reachable.');
            console.log('-> Is MySQL running? (sudo systemctl status mysql)');
            console.log('-> Is the port correct? (Default 3306)');
        } else if (error.name === 'SequelizeConnectionError' && error.message.includes('Unknown database')) {
            console.log(`-> The database "${process.env.DB_NAME}" does not exist.`);
            console.log('-> Log in to mysql and run: CREATE DATABASE ' + process.env.DB_NAME + ';');
        }

        process.exit(1);
    }
}

testConnection();
