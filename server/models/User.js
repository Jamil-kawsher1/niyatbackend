const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    calculationMethod: {
        type: DataTypes.STRING,
        defaultValue: 'Karachi'
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    locationName: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = User;
