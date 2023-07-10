const { DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/database");

class Person extends Model {}
const options = {
  sequelize,
  modelName: 'Person'
};
Person.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},options);

module.exports = Person;
