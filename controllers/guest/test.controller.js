const db = require("../../database/models");
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
        res.send(data); // data need sort with questionIds
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving test pool."
        });
      });
  }
}

module.exports = testController;
