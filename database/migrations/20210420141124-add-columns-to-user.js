'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('Users', 'nameWithoutUtf8', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Users', 'militaryCode', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Users', 'sex', {
        type: Sequelize.TINYINT
      }),
      queryInterface.addColumn('Users', 'isBlock', {
        type: Sequelize.TINYINT
      }),
      queryInterface.changeColumn('Users', 'role', {
        type: Sequelize.STRING
      })
    ];
  },

  down: async (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('Users', 'nameWithoutUtf8'),
      queryInterface.removeColumn('Users', 'militaryCode'),
      queryInterface.removeColumn('Users', 'sex'),
      queryInterface.removeColumn('Users', 'isBlock'),
      queryInterface.changeColumn(
        'Users',
        'role', 
        {
          type: Sequelize.INTEGER
        }
      )
    ];
  }
};
