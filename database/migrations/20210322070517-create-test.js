'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      index: {
        type: Sequelize.INTEGER
      },
      testVersionId: {
        type: Sequelize.STRING
      },
      questionIds: {
        type: Sequelize.TEXT
      },
      code: {
        unique: true,
        type: Sequelize.STRING
      },
      liePercent: {
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },
    {
      charset: 'utf8'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tests');
  }
};
