"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  class Pelanggan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pelanggan.belongsToMany(models.Role, { through: "pelangganRoles", foreignKey: "pelanggan_id" });
      Pelanggan.hasMany(models.Transaksi, { foreignKey: "pelanggan_id" });
    }
  }
  Pelanggan.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
      alamat: Sequelize.STRING,
      no_telp: Sequelize.STRING,
    },
    {
      sequelize,
      modelName: "Pelanggan",
    }
  );
  return Pelanggan;
};
