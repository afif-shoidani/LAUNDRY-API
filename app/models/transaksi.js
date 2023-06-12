"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  class Transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaksi.belongsTo(models.Pelanggan, {
        foreignKey: "pelanggan_id",
        onDelete: "CASCADE",
        onUpdate: "RESTRICT",
      });
      Transaksi.belongsTo(models.Item, {
        foreignKey: "item_id",
        onDelete: "CASCADE",
        onUpdate: "RESTRICT",
      });
    }
  }
  Transaksi.init(
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      tanggal: Sequelize.DATE,
      pelanggan_id: Sequelize.INTEGER,
      item_id: Sequelize.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaksi",
    }
  );
  return Transaksi;
};
