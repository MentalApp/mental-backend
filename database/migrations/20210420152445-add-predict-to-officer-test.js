'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('OfficerTests', 'predict', {
        type: Sequelize.STRING
      })
    ];
  },

  down: async (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('OfficerTests', 'predict')
    ];
  }
};
