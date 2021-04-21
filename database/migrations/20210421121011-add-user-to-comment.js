'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('Comments', 'user', {
        type: Sequelize.TEXT
      })
    ];
  },

  down: async (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('Comments', 'user')
    ];
  }
};
