const db = require('../../database/models');
const serviceUtil = require('../../servicehelper/service.result');
const exceptionUtil = require('../../handler_error/exceptionUtil');
const testSerializer = require('../../serializers/test.serializer');
const appSetting = require('../../appconfig/app.config');
const jwt = require('jsonwebtoken');

const TestPool = db.TestPool;
const Test = db.Test;
const Op = db.Sequelize.Op;

const testController = {
  findAllTestPool: async (req, res) => {
    let serviceResult = serviceUtil.new();
    try {
      const token = req.headers[appSetting.authKey];
      const decode = jwt.verify(token, appSetting.jwtConfig.guestSecretKey);
      const id = decode.id;
      const test = await Test.findByPk(id);
      if (test) {
        questionIds = test.questionIds ? JSON.parse(test.questionIds) : [];
      } else {
        serviceResult.success = false;
        serviceResult.error = 'Test not found';
        serviceResult.code = 404;
      }
      const condition = {id: {[Op.in]: questionIds}};
      const data = await TestPool.findAll({where: condition});

      if (data) {
        serviceResult.data = testSerializer.new(test, data);
        serviceResult.success = true;
        serviceResult.code = 200;
      }
    } catch (error) {
      exceptionUtil.handlerErrorAPI(res, serviceResult, error);
    } finally {
      res.json(serviceResult);
    }
  },
};

module.exports = testController;
