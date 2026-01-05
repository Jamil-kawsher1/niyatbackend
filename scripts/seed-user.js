const { Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');
const User = require('../server/models/User');
require('dotenv').config();

const sequelize = require('../server/config/database');

const SEED_USER = {
    username: 'badhon0777',
    email: 'badhon0777@gmail.com',
    password: 'password123' // User should change this
};

async function seedUser() {
    console.log('--- Seeding User ---');
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        const existingUser = await User.findOne({ where: { email: SEED_USER.email } });
        if (existingUser) {
            console.log(`User ${SEED_USER.email} already exists. Skipping.`);
            process.exit(0);
        }

        console.log(`Creating user ${SEED_USER.email}...`);
        const hashedPassword = await bcrypt.hash(SEED_USER.password, 10);

        await User.create({
            username: SEED_USER.username,
            email: SEED_USER.email,
            password: hashedPassword
        });

        console.log('✅ User created successfully.');
        console.log(`Email: ${SEED_USER.email}`);
        console.log(`Password: ${SEED_USER.password}`);
        console.log('IMPORTANT: Please change this password immediately.');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
}

seedUser();
