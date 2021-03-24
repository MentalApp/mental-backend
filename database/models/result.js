'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Result.init({
    testVersionId: DataTypes.STRING,
    total: DataTypes.INTEGER,
    filterOfficer: DataTypes.INTEGER
  }, {
    sequelize,
    charset: 'utf8',
    modelName: 'Result',
  });
  return Result;
};
