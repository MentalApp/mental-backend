const resultUtil = require('../../servicehelper/service.result')
const exceptionUtil = require('../../handler_error/exceptionUtil')
const db = require("../../database/models");
const officerTestSerializer = require("../../serializers/officer_test.serializer");
const moment = require('moment');

const OfficerTest = db.OfficerTest;

const officerTestController = {
  create: async (req, res) => {
    // const publisherHelper = await require('../../worker/publisher');
    // const chanel = await publisherHelper.createChannel()
    // const consumer = consumerConfig.consumers.find(x => x.jobTitle === "saveAnswner");
    let serviceResult = resultUtil.new();
    try {
      const officerTest = req.body;
      officerTest.answer = JSON.stringify(officerTest.answer);
      const builderData = OfficerTest.build(officerTest);
      const data = await builderData.save();

      if (data) {
        serviceResult.code = 200;
        serviceResult.success = true;
        serviceResult.data = officerTestSerializer.new(data)
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
