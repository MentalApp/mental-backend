'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Comment.init({
    officerId: DataTypes.STRING,
    userId: DataTypes.STRING,
    comment: DataTypes.TEXT,
    user: DataTypes.TEXT,
  }, {
    sequelize,
    charset: 'utf8',
    modelName: 'Comment',
  });
  return Comment;
};
