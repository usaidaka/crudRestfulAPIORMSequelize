"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.belongsToMany(models.Book, {
        through: "Lending",
        foreignKey: "idCustomer",
        as: "Customers",
      });
    }
  }
  Customer.init(
    {
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Customer",
      paranoid: true,
    }
  );
  return Customer;
};
