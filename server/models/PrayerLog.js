const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PrayerLog = sequelize.define('PrayerLog', {
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        unique: 'user_date_unique'
    },
    fajr_status: {
        type: DataTypes.ENUM('NONE', 'PRAYED', 'MISSED'),
        defaultValue: 'NONE'
    },
    dhuhr_status: {
        type: DataTypes.ENUM('NONE', 'PRAYED', 'MISSED'),
        defaultValue: 'NONE'
    },
    asr_status: {
        type: DataTypes.ENUM('NONE', 'PRAYED', 'MISSED'),
        defaultValue: 'NONE'
    },
    maghrib_status: {
        type: DataTypes.ENUM('NONE', 'PRAYED', 'MISSED'),
        defaultValue: 'NONE'
    },
    isha_status: {
        type: DataTypes.ENUM('NONE', 'PRAYED', 'MISSED'),
        defaultValue: 'NONE'
    },
    tahajjud_status: {
        type: DataTypes.ENUM('NONE', 'PRAYED', 'MISSED'),
        defaultValue: 'NONE'
    },
    ishrak_status: {
        type: DataTypes.ENUM('NONE', 'PRAYED', 'MISSED'),
        defaultValue: 'NONE'
    },
    duha_status: {
        type: DataTypes.ENUM('NONE', 'PRAYED', 'MISSED'),
        defaultValue: 'NONE'
    },
    awwabin_status: {
        type: DataTypes.ENUM('NONE', 'PRAYED', 'MISSED'),
        defaultValue: 'NONE'
    },
    userId: { // Explicitly adding for clarity, though associations handle it
        type: DataTypes.INTEGER,
        unique: 'user_date_unique'
    }
});

module.exports = PrayerLog;
