const db = require("../../database/models");
const officerTestSerializer = require("../../serializers/officer_test.serializer")

const OfficerTest = db.OfficerTest;

const officerTestController = {
  findAll: async (req, res) => {
    const unit = req.query.unit;
    var condition = unit ? { unit: { [Op.like]: `%${unit}%` } } : null;

    OfficerTest.findAll({ where: condition })
      .then(data => {
        res.json({
          success: true,
          data: data.map(item => testSerializer.new(item))
        });
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          error: err.message || "Some error occurred while retrieving tests."
        });
      });
  },

  findOne: async (req, res) => {
    const id = req.params.id;

    OfficerTest.findByPk(id)
      .then(data => {
        res.json({
          success: true,
          data: officerTestSerializer.new(data)
        });
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          error: err.message || "Error retrieving Officer Test with id=" + id
        });
      });
  }
}

module.exports = officerTestController;