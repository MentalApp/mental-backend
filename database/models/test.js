'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Test extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Test.init(
    {
      index: DataTypes.INTEGER,
      testVersionId: DataTypes.STRING,
      questionIds: DataTypes.TEXT,
      description: DataTypes.TEXT,
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      timer: DataTypes.INTEGER,
      isClose: DataTypes.BOOLEAN,
      entryCode: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
    },
    {
      sequelize,
      charset: 'utf8',
      modelName: 'Test',
      validate: {
        requireOption() {
          const me = this;
          if (!me.code) {
            throw new Error('code is require');
          }
        },
      },
    },
  );
  return Test;
};
