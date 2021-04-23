'use strict';
const dateHelper = require('../../helpers/date.helper');
const filterService = require('../../services/filter.service');
const moment = require('moment');
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OfficerNewTests extends Model {
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
      this.dateOfBirth = dateHelper.formatDateStringToObject(values.dateOfBirth);
      this.joinArmy = dateHelper.formatMonth(values.joinArmy);
    }
  }
  OfficerNewTests.init(
    {
      question: DataTypes.TEXT,
      name: DataTypes.STRING,
      dateOfBirth: DataTypes.DATE,
      gender: DataTypes.INTEGER,
      nation: DataTypes.STRING,
      joinArmy: DataTypes.DATE,
      unit: DataTypes.INTEGER,
      rank: DataTypes.STRING,
      position: DataTypes.STRING,
      answer: DataTypes.TEXT,
      doctorPredict: DataTypes.TINYINT,
      doctorPredictDiagnosis: DataTypes.TINYINT,
      predictShallowFilter: DataTypes.INTEGER,
      predictDeepFilter: DataTypes.INTEGER,
      testTime: DataTypes.INTEGER,
      testVersion: DataTypes.STRING,
      userConfirmId: DataTypes.STRING,
      otherSymptom: DataTypes.TEXT,
      otherPeople: DataTypes.TEXT,
      militaryCode: DataTypes.STRING,
      nameWithoutTone: DataTypes.STRING,
      predict_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      charset: 'utf8',
      modelName: 'OfficerNewTests',
      validate: {},
    },
  );
  OfficerNewTests.addHook('beforeSave', async (instance, options) => {
    const shallowFilter = await filterService.shallowFilter(instance);
    const deepFilter = await filterService.deepFilter(instance);

    instance.predictShallowFilter = shallowFilter;
    instance.predictDeepFilter = deepFilter;
  });
  return OfficerNewTests;
};
