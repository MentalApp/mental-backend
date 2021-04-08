const db = require("../../database/models");
const officerTestSerializer = require("../../serializers/officer_test.serializer")
const resultUtil = require('../../servicehelper/service.result');
const exceptionUtil = require('../../handler_error/exceptionUtil');

const OfficerTest = db.OfficerTest;
const Op = db.Sequelize.Op;

const officerTestController = {
  findAll: async (req, res) => {
    let serviceResult = resultUtil.new();
    try {
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
      if (unit) { Object.assign(condition, { unit: unit }) };
      if (predictDeepFilter) { Object.assign(condition, { predictDeepFilter: predictDeepFilter }) };
      if (predictShallowFilter) { Object.assign(condition, { predictShallowFilter: predictShallowFilter }) };

      const data = await OfficerTest.findAll({ where: condition })
      if (data) {
        serviceResult.code = 200;
        serviceResult.success = true;
        serviceResult.data = data.map(item => officerTestSerializer.new(item))
      } else {
        serviceResult.code = 400;
        serviceResult.success = false;
        serviceResult.error = "Some error occurred while retrieving tests.";
      }
    } catch {
      exceptionUtil.handlerErrorAPI(res, serviceResult, error);
    } finally {
      res.json(serviceResult);
    }
  },

  findOne: async (req, res) => {
    let serviceResult = resultUtil.new();
    try {
      const id = req.params.id;
      const data = await OfficerTest.findByPk(id)
      if (data) {
        serviceResult.code = 200;
        serviceResult.success = true;
        serviceResult.data = officerTestSerializer.new(data);
      } else {
        serviceResult.code = 404;
        serviceResult.success = false;
        serviceResult.error = "Error retrieving Officer Test with id=" + id;
      }
    } catch {
      exceptionUtil.handlerErrorAPI(res, serviceResult, error);
    } finally {
      res.json(serviceResult);
    }
  }
}

module.exports = officerTestController;