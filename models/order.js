const { DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/database");

class Order extends Model {}

const options = {
  sequelize,
  modelName: "Order",
};

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  options
);

module.exports = Order;
