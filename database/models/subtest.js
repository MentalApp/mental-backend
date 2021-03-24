'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubTest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SubTest.init({
    testId: DataTypes.STRING,
    questionIds: DataTypes.TEXT,
    testVersionId: DataTypes.STRING
  }, {
    sequelize,
    charset: 'utf8',
    modelName: 'SubTest',
  });
  return SubTest;
};
