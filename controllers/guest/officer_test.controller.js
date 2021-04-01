const db = require("../../database/models");
const officerTestSerializer = require("../../serializers/officer_test.serializer")

const OfficerTest = db.OfficerTest;

const officerTestController = {
  create: async (req, res) => {
    // const publisherHelper = await require('../../worker/publisher');
    // const chanel = await publisherHelper.createChannel()
    // const consumer = consumerConfig.consumers.find(x => x.jobTitle === "saveAnswner");
    const officerTest = req.body
    officerTest.answer = JSON.stringify(officerTest.answer)
    officerTest.dateOfBirth = new Date(officerTest.dateOfBirth)
    officerTest.joinArmy = new Date(officerTest.joinArmy)

    OfficerTest.create(officerTest)
      .then(data => {
        res.json({
          success: true,
          data: officerTestSerializer.new(data)
        });
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          error: err.message || "Some error occurred while creating the Officer test."
        });
      });
  }
}

module.exports = officerTestController;
