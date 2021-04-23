'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('Predicts', 'userId', {
        type: Sequelize.TINYINT,
      }),
      queryInterface.addColumn('Predicts', 'diagnosis', {
        type: Sequelize.TINYINT,
      }),
      queryInterface.addColumn('Predicts', 'nameUser', {
        type: Sequelize.STRING,
      }),
    ];
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('predicts');
  },
};
