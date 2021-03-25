const db = require("../../database/models");
const testSerializer = require("../../serializers/test.serializer")

const TestPool = db.TestPool;
const Test = db.Test;
const Op = db.Sequelize.Op;

const testController = {
  findAllTestPool: async (req, res) => {
    const code = req.query.code
    const test = await Test.findOne({ where: { code: { [Op.eq]: code } } })
    if(!!test) {
      questionIds = !!test.questionIds ? JSON.parse(test.questionIds) : [];
    }
    else {
      res.status(404).send({
        message:
          "Test not found"
      });
    }
    var condition = { id: { [Op.in]: questionIds } };

    TestPool.findAll({ where: condition })
      .then(data => {
        res.json({
          success: true,
          data: testSerializer.new(test, data)
        });
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          error: err.message || "Some error occurred while retrieving test."
        });
      });
  }
}

module.exports = testController;
