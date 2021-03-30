'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OfficerTest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  OfficerTest.init({
    question: DataTypes.TEXT,
    name: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    gender: DataTypes.INTEGER,
    nation: DataTypes.STRING,
    joinArmy: DataTypes.DATE,
    unit: DataTypes.STRING,
    rank: DataTypes.STRING,
    position: DataTypes.STRING,
    answer: DataTypes.TEXT,
    isLieConfirm: DataTypes.BOOLEAN,
    liePredictPercent: DataTypes.DOUBLE,
    testTime: DataTypes.INTEGER,
    testVersion: DataTypes.STRING,
    userConfirmId: DataTypes.STRING,
    otherSymptom: DataTypes.TEXT,
    otherPeople: DataTypes.TEXT
  }, {
    sequelize,
    charset: 'utf8',
    modelName: 'OfficerTest'
  });
  return OfficerTest;
};
