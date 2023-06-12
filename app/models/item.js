"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.hasMany(models.Transaksi, { foreignKey: "item_id" });
    }
  }
  Item.init(
    {
      nama: Sequelize.STRING,
      harga: Sequelize.DECIMAL,
      jumlah: Sequelize.INTEGER,
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
