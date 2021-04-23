'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Predict extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Predict.init(
    {
      userId: DataTypes.INTEGER,
      nameUser: DataTypes.STRING,
      officerTestId: DataTypes.TINYINT,
      predict: DataTypes.TINYINT,
      //chuẩn đoán bệnh
      diagnosis: DataTypes.TINYINT,
      conflict: DataTypes.STRING,
    },
    {
      sequelize,
      charset: 'utf8',
      modelName: 'Predict',
    },
  );
  return Predict;
};
