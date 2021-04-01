const db = require("../../database/models");
const testSerializer = require("../../serializers/test.serializer")
const testPoolSerializer = require("../../serializers/test_pool.serializer")
const memoryCache = require('memory-cache');
const appconfig = require('../../appconfig/app.config');

const Test = db.Test;
const TestPool = db.TestPool;
const Op = db.Sequelize.Op;

const testController = {
  createTestPool: async (req, res) => {
    const testPool = req.body;

    TestPool.create(testPool)
      .then(data => {
        res.json({
          success: true,
          data: testPoolSerializer.new(data)
        });
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          error: err.message || "Some error occurred while creating the Test Pool."
        });
      });
  },

  findAllTestPool: async (req, res) => {
    const question = req.query.question;
    var condition = question ? { question: { [Op.like]: `%${question}%` } } : null;

    TestPool.findAll({ where: condition })
      .then(data => {
        res.json({
          success: true,
          data: data.map(item => testPoolSerializer.new(item))
        });
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          error: err.message || "Some error occurred while retrieving test pool."
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
            success: true
          });
        } else {
          res.send({
            success: false
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          success: false,
          error: err.message || "Could not delete Test pool with id=" + id
        });
      });
  },

  createTest: async (req, res) => {
    const test = req.body;
    test.questionIds = JSON.stringify(req.body.questionIds);

    Test.create(test)
      .then(data => {
        res.json({
          success: true,
          data: testSerializer.new(data)
        });
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          error: err.message || "Some error occurred while creating the Test."
        });
      });
  },

  findAllTest: async (req, res) => {
    const testVersionId = req.query.testVersionId;
    var condition = testVersionId ? { testVersionId: { [Op.like]: `%${testVersionId}%` } } : null;

    Test.findAll({ where: condition })
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

  findOneTest: async (req, res) => {
    const id = req.params.id;

    Test.findByPk(id)
      .then(data => {
        res.json({
          success: true,
          data: testSerializer.new(data)
        });
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          error: err.message || "Error retrieving Test with id=" + id
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
          res.json({
            success: true
          });
        } else {
          res.json({
            success: false
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          error: err.message || "Error updating Test with id=" + id
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
          res.json({
            success: true
          });
        } else {
          res.json({
            success: false
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          status: false,
          error: err.message || "Could not delete Test with id=" + id
        });
      });
  },
  
  startTest: async (req, res) => {
    let serviceResult = { code: 200, data: null, message: "" }
    try {
      if (req.body.id) {
        const id = req.body.id;
        const test = await Test.findByPk(id);
        if (test) {
          const joinTestCode = Math.floor(100000 + Math.random() * 900000).toString();
          const joinInKey = appconfig.cacheKey.joinIn + joinTestCode.toString();
          const coefficientMsToMinute = 60000;
          const testValue = test.dataValues;
          const timer = test.timer || 90;
          const testWithEntryCode = Object.assign({
            entryCode: joinTestCode
          }, testValue);
          //time is ms
          memoryCache.put(joinInKey, testWithEntryCode, coefficientMsToMinute * timer, (key, value) => {
            test.update({ isClose: true });
          });

          test.update({ isClose: false });
          serviceResult.data = testWithEntryCode;
        }

      } else {
        throw new Error("argument incorrect");
      }
    } catch (error) {
      serviceResult.code = 500;
      serviceResult.message = error.message;
    } finally {
      res.json(serviceResult);
    }
  }
}

module.exports = testController;
