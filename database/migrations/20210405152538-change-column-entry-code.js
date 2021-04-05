'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'Tests',
      'entryCode', 
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'Tests',
      'entryCode', 
      {
        type: Sequelize.STRING,
        allowNull: false,
      }
    );
  }
};
