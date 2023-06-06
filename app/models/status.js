"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Status.belongsTo(models.User);
    }
  }
  Status.init(
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      title: Sequelize.STRING,
      body: Sequelize.STRING,
      user_id: Sequelize.INTEGER,
    },
    {
      sequelize,
      modelName: "Status",
    }
  );
  return Status;
};
