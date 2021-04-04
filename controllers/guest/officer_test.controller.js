const db = require("../../database/models");
const officerTestSerializer = require("../../serializers/officer_test.serializer");
const moment = require('moment');

const OfficerTest = db.OfficerTest;

const officerTestController = {
  create: async (req, res) => {
    // const publisherHelper = await require('../../worker/publisher');
    // const chanel = await publisherHelper.createChannel()
    // const consumer = consumerConfig.consumers.find(x => x.jobTitle === "saveAnswner");

    try {
      const officerTest = req.body;
      officerTest.answer = JSON.stringify(officerTest.answer);
      const builderData = OfficerTest.build(officerTest);
      const data = await builderData.save();

      if (data) {
        res.json({
          success: true,
          data: officerTestSerializer.new(data)
        });
      } else {
        res.status(400).json({
          success: false,
          error: "Some error occurred while creating the Officer test."
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message || "Some error occurred while creating the Officer test."
      });
    } finally {

    }
  }
}

module.exports = officerTestController;
