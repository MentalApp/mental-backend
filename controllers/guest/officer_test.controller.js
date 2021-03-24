const db = require("../../database/models");
const OfficerTest = db.OfficerTest;
// const Op = db.Sequelize.Op;

const officerTestController = {
  create: async (req, res) => {
    const officerTest = req.body;
    officerTest.answer = JSON.stringify(req.body.answer);

    OfficerTest.create(officerTest)
      .then(data => {
        data.answer = JSON.parse(data.answer)
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      });
  }
}

module.exports = officerTestController;
