'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TestPool extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  TestPool.init({
    question: DataTypes.STRING
  }, {
    sequelize,
    charset: 'utf8',
    modelName: 'TestPool',
  });
  return TestPool;
};
