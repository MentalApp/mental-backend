const jwt = require('jsonwebtoken');
const appSetting = require('../../appconfig/app.config');
const db = require("../../database/models");
const memoryCache = require('memory-cache');
const exceptionUtil = require('../../handler_error/exceptionUtil');
const Test = db.Test;

const authController = {
  joinin: async (req, res) => {
    let serviceResult = { code: 200, data: null, error: "", success: false }
    try {
      const joinInCode = req.body.code;
      const joinInKeyCache = appSetting.cacheKey.joinIn + `${joinInCode.toString()}`;
      const testWithEntryCode = memoryCache.get(joinInKeyCache);
      if (testWithEntryCode && testWithEntryCode.entryCode) {
        const id = testWithEntryCode.id;
        const test = await Test.findByPk(id);
        if (test && !test.isClose) {
          const token = jwt.sign((test.dataValues), appSetting.jwtConfig.guestSecretKey);
          serviceResult.token = token;
          serviceResult.success = true;
        } else {
          serviceResult.error = "Test invalid";
          res.status(500);
        }
      } else {
        serviceResult.error = "Test has expired";
        res.status(500);
      }


    } catch (error) {
      exceptionUtil.handlerErrorAPI(res, serviceResult, error);
    } finally {
      res.json(serviceResult);
    }
  }
}

module.exports = authController;
