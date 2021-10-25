// @ts-check

const {DataTypes, Sequelize} = require('sequelize')
const sequelize = new Sequelize('studyareatest', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const areaModel = sequelize.define('study_area',{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    
}, {})

module.exports = {
    areaModel,
    sequelize
}