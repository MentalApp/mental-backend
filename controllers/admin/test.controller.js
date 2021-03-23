const db = require("../../database/models");
const Test = db.Test;
const TestPool = db.TestPool;
const Op = db.Sequelize.Op;

exports.createTestPool = (req, res) => {
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
};

exports.findAllTestPool = (req, res) => {
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
};

exports.deleteTestPool = (req, res) => {
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
};

exports.createTest = (req, res) => {
  const test = req.body;

  Test.create(test)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Test."
      });
    });
};

exports.findAllTest = (req, res) => {
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
};

exports.findOneTest = (req, res) => {
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
};

exports.updateTest = (req, res) => {
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
};

exports.deleteTest = (req, res) => {
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
};
