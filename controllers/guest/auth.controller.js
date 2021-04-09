const jwt = require('jsonwebtoken');
const appSetting = require('../../appconfig/app.config');
const db = require("../../database/models");
const memoryCache = require('memory-cache');
const resultUtil = require('../../servicehelper/service.result')
const exceptionUtil = require('../../handler_error/exceptionUtil');
const Test = db.Test;

const authController = {
  joinIn: async (req, res) => {
    let serviceResult = resultUtil.new()
    try {
      const joinInCode = req.body.code;
      const joinInKeyCache = appSetting.cacheKey.joinIn + `${joinInCode}`;
      const cachingTestValue = memoryCache.get(joinInKeyCache);
      if (cachingTestValue && cachingTestValue.code) {
        const id = cachingTestValue.id;
        const test = await Test.findByPk(id);
        if (test && !test.isClose) {
          const token = jwt.sign((test.dataValues), appSetting.jwtConfig.guestSecretKey);
          serviceResult.token = token;
          serviceResult.success = true;
        } else {
          serviceResult.error = "Test invalid";
          serviceResult.code = 400;
        }
      } else {
        serviceResult.error = "Test has expired";
        serviceResult.code = 400;
      }
    } catch (error) {
      exceptionUtil.handlerErrorAPI(res, serviceResult, error);
    } finally {
      res.json(serviceResult);
    }
  }
}

module.exports = authController;
