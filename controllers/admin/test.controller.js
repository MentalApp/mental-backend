const db = require("../../database/models");
const Test = db.Test;
const TestPool = db.TestPool;
const Op = db.Sequelize.Op;

const testController = {
  createTestPool: async (req, res) => {
    const testPool = req.body;

    TestPool.create(testPool)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Test Pool."
        });
      });
  },

  findAllTestPool: async (req, res) => {
    const question = req.query.question;
    var condition = question ? { question: { [Op.like]: `%${question}%` } } : null;

    TestPool.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving test pool."
        });
      });
  },

  deleteTestPool: async (req, res) => {
    const id = req.params.id;

    TestPool.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Test pool was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Test pool with id=${id}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Test pool with id=" + id
        });
      });
  },

  createTest: async (req, res) => {
    const test = req.body;
    test.questionIds = JSON.stringify(req.body.questionIds);

    Test.create(test)
      .then(data => {
        data.questionIds = JSON.parse(data.questionIds)
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Test."
        });
      });
  },

  findAllTest: async (req, res) => {
    const testVersionId = req.query.testVersionId;
    var condition = testVersionId ? { testVersionId: { [Op.like]: `%${testVersionId}%` } } : null;

    Test.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tests."
        });
      });
  },

  findOneTest: async (req, res) => {
    const id = req.params.id;

    Test.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Test with id=" + id
        });
      });
  },

  updateTest: async (req, res) => {
    const id = req.params.id;

    Test.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Test was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Test with id=${id}. Maybe Test was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Test with id=" + id
        });
      });
  },

  deleteTest: async (req, res) => {
    const id = req.params.id;

    Test.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Test was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Test with id=${id}. Maybe Test was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Test with id=" + id
        });
      });
  }
}

module.exports = testController;
