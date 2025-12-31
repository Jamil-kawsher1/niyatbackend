const { Sequelize } = require('sequelize');
require('dotenv').config();

// For development, using a local sqlite file or mock if mysql credentials aren't provided
// But per plan, we assume MySQL. 
const sequelize = new Sequelize(
    process.env.DB_NAME || 'niyat',
    process.env.DB_USER || 'root',
    process.env.DB_PASS || 'password',
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: false
    }
);

module.exports = sequelize;
