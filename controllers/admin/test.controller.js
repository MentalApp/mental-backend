const db = require("../../database/models");
const testSerializer = require("../../serializers/test.serializer")
const testPoolSerializer = require("../../serializers/test_pool.serializer")
const memoryCache = require('memory-cache');
const appconfig = require('../../appconfig/app.config');
const resultUtil = require('../../servicehelper/service.result');
const exceptionUtil = require('../../handler_error/exceptionUtil');

const httpCode = require('http-status-codes');

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
        res.status(400).json({
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
        res.status(400).json({
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
        res.status(400).send({
          success: false,
          error: err.message || "Could not delete Test pool with id=" + id
        });
      });
  },

  /**
   * @endpoint POST("/")
   * @param {*} req 
   * @param {*} res 
   */
  createTest: async (req, res) => {
    const serviceResult = resultUtil.new();
    try {
      const test = req.body;
      test.questionIds = JSON.stringify(req.body.questionIds);
      const data = await Test.create(test);
      if (data) {
        serviceResult.success = true;
        serviceResult.data = testSerializer.new(data);
      } else {
        serviceResult.success = false;
        serviceResult.error = "Have exception when insert data";
      }
    } catch (error) {
      exceptionUtil.handlerErrorAPI(res, serviceResult, error);
    } finally {
      res.json(serviceResult);
    }
  },

  /**
   * @endpoint GET("/")
   * @param {*} req 
   * @param {*} res 
   */
  findAllTest: async (req, res) => {
    // const codeOfTheTest = req.query.code;
    // var condition = codeOfTheTest ? { testVersionId: { [Op.like]: `%${codeOfTheTest}%` } } : null;
    const serviceResult = resultUtil.new();
    try {
      const test = req.body;
      test.questionIds = JSON.stringify(req.body.questionIds);
      const data = await Test.findAll();
      if (data) {
        serviceResult.success = true;
        serviceResult.data = data.map(item => testSerializer.new(item));
      }
    } catch (error) {
      exceptionUtil.handlerErrorAPI(res, serviceResult, error);
    } finally {
      res.json(serviceResult);
    }
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
        res.status(400).json({
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
        res.status(400).json({
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
        res.status(400).send({
          status: false,
          error: err.message || "Could not delete Test with id=" + id
        });
      });
  },

  /**
   * @endpoint POST("/start")
   * @param {*} req 
   * @param {*} res 
   */
  startTest: async (req, res) => {
    let serviceResult = resultUtil.new();
    try {
      if (req.body.id) {
        const id = req.body.id;
        const test = await Test.findByPk(id);
        if (test && test.isClose) {
          const startedTests = await Test.findAll({ where: { isClose: false } });
          if (startedTests.length < 20) {
            const entryCode = req.body.entryCode;

            if (entryCode) {
              // const condition = { entryCode: { [Op.eq]: `${entryCode}` } };
              const hasDuplicateCode = startedTests.some(x => x.entryCode === entryCode && x.id !== id);
              if (hasDuplicateCode) {
                serviceResult.success = false;
                serviceResult.error = "Duplicate entryCode";
              }
              else {
                const joinInKey = appconfig.cacheKey.joinIn + entryCode.toString();
                const coefficientMsToMinute = 60000;
                const testValue = { ...test.dataValues };
                const timer = test.timer || 90;
                const testWithEntryCode = Object.assign(testValue, {
                  entryCode: entryCode
                });
                const timeStart = new Date().getTime();
                //time is ms
                memoryCache.put(joinInKey, testWithEntryCode, coefficientMsToMinute * timer, (key, value) => {
                  test.update({ isClose: true });
                  console.log(key + `: ${timeStart} - ${new Date.getTime()}`);
                });

                test.update({ isClose: false, entryCode: entryCode });

                serviceResult.data = testWithEntryCode;
                serviceResult.success = true;
              }
            } else {
              throw new Error("Entry code is require for start test");
            }

          } else {
            throw new Error("Too many started test");
          }
        }
        else {
          serviceResult.error = "Test was started";
          res.status(400);
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
  },

  /**
   * @endpoint POST("/clear")
   * @param {*} req 
   * @param {*} res 
   */
  clearTest: async (req, res) => {
    let serviceResult = resultUtil.new();
    try {
      const id = req.body.id;
      if (id) {
        const test = await Test.findByPk(id);
        if (test && test.entryCode) {
          const isDelete = memoryCache.del(appconfig.cacheKey.joinIn + test.entryCode.toString());
          if (!isDelete) {
            console.log("cache not found!");
          }
          const data = await Test.update({ isClose: true }, { where: { id: id }, validate: false });
          serviceResult.data = data ? true : false;
          serviceResult.success = true;
        } else {
          throw ("Test not found");
        }
      }
    } catch (error) {
      exceptionUtil.handlerErrorAPI(res, serviceResult, error);
    } finally {
      res.json(serviceResult);
    }

  }
}

module.exports = testController;
