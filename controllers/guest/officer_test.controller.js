const resultUtil = require('../../servicehelper/service.result')
const exceptionUtil = require('../../handler_error/exceptionUtil')
const db = require("../../database/models");
const officerTestSerializer = require("../../serializers/officer_test.serializer");
const appSetting = require('../../appconfig/app.config');
const moment = require('moment');
const vietnamese = require('../../helpers/vietnameseTone.helper')
const jwt = require('jsonwebtoken');

const OfficerTest = db.OfficerTest;
const Test = db.Test;

const officerTestController = {
  create: async (req, res) => {
    // const publisherHelper = await require('../../worker/publisher');
    // const chanel = await publisherHelper.createChannel()
    // const consumer = consumerConfig.consumers.find(x => x.jobTitle === "saveAnswner");
    let serviceResult = resultUtil.new();
    try {
      const token = req.headers[appSetting.authKey];
      const decode = jwt.verify(token, appSetting.jwtConfig.guestSecretKey);
      const id = decode.id

      const officerTest = req.body;
      officerTest.answer = JSON.stringify(officerTest.answer);
      officerTest.testVersion = id.toString();
      officerTest.nameWithoutTone = vietnamese.removeVietnameseTones(officerTest.name)
      const builderData = OfficerTest.build(officerTest);
      const data = await builderData.save();
      const test = await Test.findByPk(id);

      if (data) {
        serviceResult.code = 200;
        serviceResult.success = true;
        serviceResult.data = officerTestSerializer.new(data, test);
      } else {
        serviceResult.code = 400;
        serviceResult.success = false;
        serviceResult.error = "Some error occurred while creating the Officer test.";
      }
    } catch (error) {
      exceptionUtil.handlerErrorAPI(res, serviceResult, error);
    } finally {
      res.json(serviceResult);
    }
  }
}

module.exports = officerTestController;
