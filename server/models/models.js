// @ts-check

const { DataTypes, Sequelize } = require('sequelize')
const sequelize = new Sequelize('studyareatest', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const userModel = sequelize.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    pass: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {})

const areaModel = sequelize.define('study_area', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(500),
        allowNull: false
    }

}, {})

const user_has_area = sequelize.define('user_has_area', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: userModel,
            key: 'id'
        }
    },
    area_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: areaModel,
            key: 'id'
        }
    }

}, {})

const areaColumns = sequelize.define('area_columns', {
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    area_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

}, {})

const columnCards = sequelize.define('cards_in_columns', {
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    column_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    area_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    card_type: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING(10000),
        allowNull: true
    },

}, {})

module.exports = {
    userModel,
    areaModel,
    user_has_area,
    areaColumns,
    columnCards,
    sequelize
}