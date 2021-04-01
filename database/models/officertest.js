'use strict';
const dateHelper = require('../../helpers/date.helper');
const filterService = require("../../services/filter.service")
const moment = require('moment');
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
    unit: DataTypes.INTEGER,
    rank: DataTypes.STRING,
    position: DataTypes.STRING,
    answer: DataTypes.TEXT,
    predictShallowFilter: DataTypes.INTEGER,
    predictDeepFilter: DataTypes.INTEGER,
    testTime: DataTypes.INTEGER,
    testVersion: DataTypes.STRING,
    userConfirmId: DataTypes.STRING,
    otherSymptom: DataTypes.TEXT,
    otherPeople: DataTypes.TEXT,
    militaryCode: DataTypes.STRING
  }, {
    sequelize,
    charset: 'utf8',
    modelName: 'OfficerTest',
    validate: {
      requireOptions() {
        const me = this;
        if (!me.militaryCode) {
          throw new Error("militaryCode is require");
        }
        if (!me.answer) {
          throw new Error("answer is require");
        } else {
          const parseAnswer = JSON.parse(me.answer);
          if (!Array.isArray(parseAnswer)) {
            throw new Error("answer must be json string array");
          }
        }

        if (!me.unit) {
          throw new Error("unit is require");
        }

      }
    }
  });
  OfficerTest.beforeSave(beforeSave, async (instance, options) => {
    const shallowFilter = await filterService.shallowFilter(instance);
    const deepFilter = await filterService.deepFilter(instance);
    instance.dateOfBirth = dateHelper.formatDateStringToObject(instance.dateOfBirth);
    instance.joinArmy = dateHelper.formatMonth(instance.joinArmy);
    instance.predictShallowFilter = shallowFilter;
    instance.predictDeepFilter = deepFilter;
    if ( typeof instance.answer !== "string") {
      instance.answer = JSON.stringify(instance.answer)
    }
  })
  
  return OfficerTest;
};


