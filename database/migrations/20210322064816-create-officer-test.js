'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OfficerTests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      dateOfBirth: {
        type: Sequelize.DATE
      },
      gender: {
        type: Sequelize.INTEGER
      },
      nation: {
        type: Sequelize.STRING
      },
      joinArmy: {
        type: Sequelize.DATE
      },
      unit: {
        type: Sequelize.STRING
      },
      rank: {
        type: Sequelize.STRING
      },
      position: {
        type: Sequelize.STRING
      },
      answer: {
        type: Sequelize.TEXT
      },
      isLieConfirm: {
        type: Sequelize.BOOLEAN
      },
      liePredictPercent: {
        type: Sequelize.DOUBLE
      },
      testTime: {
        type: Sequelize.INTEGER
      },
      testVersion: {
        type: Sequelize.STRING
      },
      userConfirmId: {
        type: Sequelize.STRING
      },
      otherSymptom: {
        type: Sequelize.TEXT
      },
      otherPeople: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('OfficerTests');
  }
};
