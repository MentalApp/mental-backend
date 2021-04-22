// Write seed here
const bcrypt = require('bcrypt-nodejs');
const moment = require('moment');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Tests',
      [
        {
          index: 2,
          testVersionId: 'qwerty',
          questionIds: JSON.stringify([
            27,
            28,
            29,
            30,
            31,
            32,
            33,
            34,
            35,
            36,
            37,
            38,
            39,
            40,
            41,
            42,
            43,
            44,
            45,
            46,
            47,
            48,
            49,
            50,
            51,
            52,
            53,
          ]),
          description: 'Đợt khảo sát lần 2',
          code: 'khaosatlan2',
          name: 'Khảo sát lần 2',
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
