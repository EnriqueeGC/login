const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Items = sequelize.define('Items', {
    itemId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'userId'
        }
    }
}, {
    tableName: 'items',
    timestamps: false
});

module.exports = Items;
