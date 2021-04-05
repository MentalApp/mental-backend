'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'Tests',
      'entryCode',
      {
        allowNull: false,
        type: Sequelize.STRING,
        length: 20
      }
    );
  },

  down: function(queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'Tests',
      'entryCode'
    );
  }
};
