// Write seed here
const bcrypt = require('bcrypt-nodejs');
const {Roles, Sex, BlockStatus} = require('../../helpers/constant');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          fullName: 'Admin',
          nameWithoutUtf8: 'admin',
          email: 'admin@gmail.com',
          militaryCode: '123456',
          phone: '0123456789',
          sex: Sex.Men.value,
          type: '',
          password: bcrypt.hashSync('123456', bcrypt.genSaltSync(8), null),
          role: Roles.admin,
          joinArmy: new Date(),
          unit: 1,
          rank: '',
          isBlock: BlockStatus.false.value,
          position: '',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
