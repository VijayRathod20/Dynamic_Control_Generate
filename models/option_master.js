"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class option_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.option_master.belongsTo(models.select_master, {
        foreignKey: "select_id",
      });
    }
  }
  option_master.init(
    {
      select_id: DataTypes.INTEGER,
      option_value: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "option_master",
    }
  );
  return option_master;
};
