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
      description: {
        type: Sequelize.TEXT
      },
      code: {
        unique: true,
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      timer: {
        type: Sequelize.INTEGER
      },
      isClose: {
        type: Sequelize.BOOLEAN
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
