const db = require("../../database/models");
const testSerializer = require("../../serializers/test.serializer")
const testPoolSerializer = require("../../serializers/test_pool.serializer")
const memoryCache = require('memory-cache');
const appconfig = require('../../appconfig/app.config');
const resultUtil = require('../../servicehelper/service.result');
const exceptionUtil = require('../../handler_error/exceptionUtil');

const Test = db.Test;
const TestPool = db.TestPool;
const Op = db.Sequelize.Op;

const testController = {
  /**
   * @endpoint POST("/test_pools")
   * @param {*} req 
   * @param {*} res 
   */
  createTestPool: async (req, res) => {
    let serviceResult = resultUtil.new()
    try {
      const testPool = req.body;
      const question = TestPool.create(testPool);
      if (question) {
        serviceResult.code = 200;
        serviceResult.success = true;
        serviceResult.data = testPoolSerializer.new(question);
      } else {
        serviceResult.code = 400;
        serviceResult.success = false;
        serviceResult.error = "Some error occurred while creating the Test Pool.";
      }
    } catch {
      exceptionUtil.handlerErrorAPI(res, serviceResult, error);
    } finally {
      res.json(serviceResult);
    }
  },

  /**
   * @endpoint GET("/test_pools")
   * @param {*} req 
   * @param {*} res 
   */
  findAllTestPool: async (req, res) => {
    let serviceResult = resultUtil.new();
    try {
      const question = req.query.question;
      const condition = { question: { [Op.substring]: question ? question : "" } };
      const questions = TestPool.findAll({ where: condition })
      if (questions) {
        serviceResult.code = 200;
        serviceResult.success = true;
        serviceResult.data = data.map(item => testPoolSerializer.new(item));
      } else {
        serviceResult.code = 400;
        serviceResult.success = false;
        serviceResult.error = "Some error occurred while retrieving test pools.";
      }
    } catch {
      exceptionUtil.handlerErrorAPI(res, serviceResult, error);
    } finally {
      res.json(serviceResult);
    }
  },

  /**
   * @endpoint DELETE("/test_pools/:id")
   * @param {*} req 
   * @param {*} res 
   */
  deleteTestPool: async (req, res) => {
    const serviceResult = resultUtil.new();
    try {
      const id = req.params.id;
      const flag = TestPool.destroy({ where: { id: id } });
      if (flag == 1) {
        serviceResult.code = 200;
        serviceResult.success = true;
      } else {
        serviceResult.code = 400;
        serviceResult.success = false;
        serviceResult.error = "Could not delete Test pool with id=" + id;
      }
    } catch {
      exceptionUtil.handlerErrorAPI(res, serviceResult, error);
    } finally {
      res.json(serviceResult);
    }
  },

  /**
   * @endpoint POST("/")
   * @param {*} req 
   * @param {*} res 
   */
  createTest: async (req, res) => {
    let serviceResult = resultUtil.new();
    try {
      const test = req.body;
      test.questionIds = JSON.stringify(req.body.questionIds);
      const data = await Test.create(test);
      if (data) {
        serviceResult.code = 200;
        serviceResult.success = true;
        serviceResult.data = testSerializer.new(data);
      } else {
        serviceResult.code = 400;
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
    let serviceResult = resultUtil.new();
    try {
      const data = await Test.findAll();
      if (data) {
        serviceResult.success = true;
        serviceResult.code = 200;
        const action = data.map(item => {
          return TestPool.findAll({ where: { id: { [Op.in]: JSON.parse(item.questionIds) } } })
        })
        let result = await Promise.all(action);
        serviceResult.data = data.map((value, index) => {
          return testSerializer.new(value, result[index]);
        });

      }
    } catch (error) {
      exceptionUtil.handlerErrorAPI(res, serviceResult, error);
    } finally {
      res.json(serviceResult);
    }
  },

  findOneTest: async (req, res) => {
    let serviceResult = resultUtil.new();
    try {
      const id = req.params.id;
      const test = await Test.findByPk(id)
      if (test) {
        const questions = await TestPool.findAll({ where: { id: { [Op.in]: JSON.parse(data.questionIds) } } });
        serviceResult.success = true;
        serviceResult.code = 200;
        serviceResult.data = testSerializer.new(data, questions);
      } else {
        serviceResult.success = false;
        serviceResult.code = 404
        serviceResult.error = "Test not found";
      }
    } catch (error) {
      exceptionUtil.handlerErrorAPI(res, serviceResult, error);
    } finally {
      res.json(serviceResult);
    }
  },

  updateTest: async (req, res) => {
    let serviceResult = resultUtil.new();
    try {
      const id = req.params.id;
      const updateParams = req.body
      const flag = Test.update(updateParams, { where: { id: id } });
      if (flag == 1) {
        serviceResult.code = 200;
        serviceResult.success = true;
      } else {
        serviceResult.code = 400;
        serviceResult.success = false;
        serviceResult.error = "Error updating Test with id=" + id;
      }
    } catch (error) {
      exceptionUtil.handlerErrorAPI(res, serviceResult, error);
    } finally {
      res.json(serviceResult);
    }
  },

  deleteTest: async (req, res) => {
    let serviceResult = resultUtil.new();
    try {
      const id = req.params.id;
      const flag = Test.destroy({ where: { id: id } })
      if (flag == 1) {
        serviceResult.code = 200;
        serviceResult.success = true;
      } else {
        serviceResult.code = 400;
        serviceResult.success = false;
        serviceResult.error = "Could not delete Test with id=" + id;
      }
    } catch (error) {
      exceptionUtil.handlerErrorAPI(res, serviceResult, error);
    } finally {
      res.json(serviceResult);
    }
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
            const joinInCode = req.body.entryCode;

            if (joinInCode) {
              // const condition = { entryCode: { [Op.eq]: `${entryCode}` } };
              const hasDuplicateCode = startedTests.some(x => x.entryCode === entryCode && x.id !== id);
              if (hasDuplicateCode) {
                serviceResult.success = false;
                serviceResult.error = "Duplicate entryCode";
              }
              else {
                const joinInKey = appconfig.cacheKey.joinIn + joinInCode.toString();
                const coefficientMsToMinute = 60000;
                const testValue = { ...test.dataValues };
                const timer = test.timer || 90;
                const testWithEntryCode = Object.assign(testValue, {
                  entryCode: joinInCode
                });
                const timeStart = new Date().getTime();
                //time is ms
                memoryCache.put(joinInKey, testWithEntryCode, coefficientMsToMinute * timer, (key, value) => {
                  test.update({ isClose: true });
                  console.log(key + `: ${timeStart} - ${new Date.getTime()}`);
                });

                test.update({ isClose: false, entryCode: joinInCode });

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
