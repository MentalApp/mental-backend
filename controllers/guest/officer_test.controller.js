const db = require("../../database/models");
const officerTestSerializer = require("../../serializers/officer_test.serializer")

const OfficerTest = db.OfficerTest;

const officerTestController = {
  create: async (req, res) => {
    const officerTest = req.body;
    officerTest.answer = JSON.stringify(req.body.answer);

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
          error: err.message || "Some error occurred while creating the User."
        });
      });
  }
}

module.exports = officerTestController;
