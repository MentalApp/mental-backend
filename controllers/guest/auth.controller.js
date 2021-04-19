const jwt = require('jsonwebtoken');
const appSetting = require('../../appconfig/app.config');
const db = require('../../database/models');
const memoryCache = require('memory-cache');
const resultUtil = require('../../servicehelper/service.result');
const exceptionUtil = require('../../handler_error/exceptionUtil');
const {Sequelize, QueryTypes} = require('sequelize');
const Test = db.Test;

const authController = {
  joinIn: async (req, res) => {
    let serviceResult = resultUtil.new();
    try {
      const joinInCode = req.body.code;
      const test = await Test.findOne({where: {code: joinInCode}});
      if (test) {
        const [{now}] = await Test.queryInterface.sequelize.query('select now() as now', {
          type: QueryTypes.SELECT,
        });
        console.log(now, test.startDate, test.endDate);
        console.log(new Date());
        if (test.startDate && test.endDate && test.startDate <= now && now <= test.endDate) {
          const token = jwt.sign(test.dataValues, appSetting.jwtConfig.guestSecretKey, {
            expiresIn: appSetting.jwtConfig.expire,
          });
          serviceResult.token = token;
          serviceResult.success = true;
        } else {
          serviceResult.error = 'Out of time';
          serviceResult.code = 400;
        }
      } else {
        serviceResult.error = 'Test not found';
        serviceResult.code = 400;
      }
    } catch (error) {
      exceptionUtil.handlerErrorAPI(res, serviceResult, error);
    } finally {
      res.json(serviceResult);
    }
  },
};

module.exports = authController;
