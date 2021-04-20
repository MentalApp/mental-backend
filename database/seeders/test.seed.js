// Write seed here
const bcrypt = require('bcrypt-nodejs');
const moment = require('moment');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Tests',
      [
        {
          index: 1,
          testVersionId: 'qwerty',
          questionIds: JSON.stringify([
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
          ]),
          description: 'Đợt khảo sát lần 1',
          code: 'khaosatlan1',
          name: 'Khảo sát lần 1',
          timer: 90,
          isClose: true,
          startDate: new Date(),
          endDate: new Date(moment('01.01.2021', 'DD-MM-YYYY').add(1, 'years')),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tests', null, {});
  },
};
