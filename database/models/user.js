'use strict';
const bcrypt = require('bcrypt-nodejs');
const dateHelper = require('../../helpers/date.helper');
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    /**
     * @override set value to insert in here
     * @param {object} values original data
     * @param {any} option option
     */
    _initValues(values, option) {
      super._initValues(values, option);
      this.joinArmy = dateHelper.formatMonth(values.joinArmy);
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      nameWithoutUtf8: DataTypes.STRING,
      email: DataTypes.STRING,
      militaryCode: DataTypes.STRING,
      password: DataTypes.STRING,
      sex: DataTypes.TINYINT,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      type: DataTypes.STRING,
      role: DataTypes.STRING,
      joinArmy: DataTypes.DATE,
      unit: DataTypes.INTEGER,
      rank: DataTypes.STRING,
      position: DataTypes.STRING,
      isBlock: DataTypes.TINYINT,
    },
    {
      sequelize,
      charset: 'utf8',
      modelName: 'User',
    },
  );
  User.beforeSave(async (instance, options) => {
    instance.joinArmy = dateHelper.formatMonth(instance.joinArmy);
    instance.password = bcrypt.hashSync(instance.password, bcrypt.genSaltSync(8), null);
  });

  return User;
};
