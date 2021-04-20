const appConfig = require('../../appconfig/app.config');
const memoryCache = require('memory-cache');
const db = require('../../database/models');
const testModel = db.Test;

module.exports = {
  startTest: async (id) => {
    let result = false;
    if (id) {
      const test = await testModel.findByPk(id);
      if (test && test.isClose) {
        const startedTests = await testModel.findAll({where: {isClose: false}});
        if (startedTests.length < 20) {
          const entryCode = test.code;
          if (entryCode) {
            const hasDuplicateCode = startedTests.some((x) => x.code === entryCode && x.id !== id);
            if (hasDuplicateCode) {
              throw 'Duplicate entryCode';
            } else {
              result = true;
              const joinInKey = appConfig.cacheKey.joinIn + entryCode.toString();
              const coefficientMsToDay = 86400000; //60000ms => 1 minute * 60 * 24
              const testValue = {...test.dataValues};
              //Tạm fix đoạn này do số to quá bị tràn kiểu INT 32 bit (khoảng 2 tỉ hơn)
              const timer = 23 > test.timer ? test.timer || 10 : 3;
              //time is ms
              memoryCache.put(joinInKey, testValue, coefficientMsToDay * timer, (key, value) => {
                test.update({isClose: true});
              });

              test.update({isClose: false, entryCode: entryCode});
            }
          } else {
            throw 'Test does not have entry code';
          }
        } else {
          throw '';
        }
      }
    } else {
      throw 'Argument in correct';
    }
    return result;
  },
  clearTest: async (id) => {
    let result = false;
    if (id) {
      const test = await testModel.findByPk(id);
      if (test && test.code) {
        const isDelete = memoryCache.del(appConfig.cacheKey.joinIn + test.code.toString());
        if (!isDelete) {
          console.log('Cache not found!');
        }
        const data = await testModel.update({isClose: true}, {where: {id: id}, validate: false});
        result = data ? true : false;
      } else {
        throw 'Test not found';
      }
    }
    return result;
  },
};
