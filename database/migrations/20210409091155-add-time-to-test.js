'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return [
      queryInterface.addColumn('Tests', 'startDate', {
        type: Sequelize.DATE
      }),
      queryInterface.addColumn('Tests', 'endDate', {
        type: Sequelize.DATE
      })
    ];
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return [
      queryInterface.removeColumn('Tests', 'startDate'),
      queryInterface.removeColumn('Tests', 'endDate')
    ];
  }
};
