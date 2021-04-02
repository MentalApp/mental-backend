const db = require("../../database/models");
const officerTestSerializer = require("../../serializers/officer_test.serializer")

const OfficerTest = db.OfficerTest;
const Op = db.Sequelize.Op;

const officerTestController = {
  findAll: async (req, res) => {
    const unit = req.query.unit;
    const keyword = req.query.keyword;
    const predictShallowFilter = req.query.predictShallowFilter
    const predictDeepFilter = req.query.predictDeepFilter
    var condition = {
      [Op.or]: [
        { 
          name:  { [Op.like]: keyword ? `%${keyword}%` : "%%" } ,
          militaryCode:  { [Op.like]: keyword ? `%${keyword}%`: "%%" } 
        }
      ]
    }

    OfficerTest.findAll({ where: condition })
      .then(data => {
        res.json({
          success: true,
          data: data.map(item => officerTestSerializer.new(item))
        });
      })
      .catch(err => {
        res.status(400).json({
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
        res.status(400).json({
          success: false,
          error: err.message || "Error retrieving Officer Test with id=" + id
        });
      });
  }
}

module.exports = officerTestController;