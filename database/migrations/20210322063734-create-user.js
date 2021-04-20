'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Users',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        fullName: {
          type: Sequelize.STRING,
        },
        nameWithoutUtf8: {
          type: Sequelize.STRING,
        },
        email: {
          unique: true,
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING,
        },
        militaryCode: {
          type: Sequelize.STRING,
        },
        sex: {
          type: Sequelize.TINYINT,
        },
        isBlock: {
          type: Sequelize.TINYINT,
        },
        address: {
          type: Sequelize.STRING,
        },
        phone: {
          unique: true,
          type: Sequelize.STRING,
        },
        type: {
          type: Sequelize.STRING,
        },
        role: {
          type: Sequelize.STRING,
        },
        joinArmy: {
          type: Sequelize.DATE,
        },
        unit: {
          type: Sequelize.INTEGER,
        },
        rank: {
          type: Sequelize.STRING,
        },
        position: {
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        charset: 'utf8',
      },
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  },
};
