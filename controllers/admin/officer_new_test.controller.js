const db = require('../../database/models');
const officerTestSerializer = require('../../serializers/officer_new_test.serializer');
const commentSerializer = require('../../serializers/comment.serializer');
const resultUtil = require('../../servicehelper/service.result');
const exceptionUtil = require('../../handler_error/exceptionUtil');
const {DefaultPaging} = require('../../helpers/constant');

const OfficerNewTests = db.OfficerNewTests;
const Test = db.Test;
const Comment = db.Comment;
const Op = db.Sequelize.Op;

const officerTestController = {
  findAll: async (req, res) => {
    let serviceResult = resultUtil.new();
    try {
      const perPage = +req.query.perPage || DefaultPaging.perPage;
      const page = +req.query.page || DefaultPaging.page;
      const unit = req.query.unit;
      const keyword = req.query.keyword;
      const predictShallowFilter = req.query.predictShallowFilter;
      const predictDeepFilter = req.query.predictDeepFilter;
      const testVersion = req.query.testVersion;
      var condition = {
        [Op.or]: [
          {
            name: {[Op.substring]: keyword ? keyword : ''},
          },
          {
            nameWithoutTone: {[Op.substring]: keyword ? keyword : ''},
          },
          {
            militaryCode: {[Op.substring]: keyword ? keyword : ''},
          },
        ],
        testVersion: {[Op.substring]: testVersion ? testVersion : ''},
      };
      if (unit) {
        Object.assign(condition, {unit: unit});
      }
      if (predictDeepFilter) {
        Object.assign(condition, {predictDeepFilter: predictDeepFilter});
      }
      if (predictShallowFilter) {
        Object.assign(condition, {
          predictShallowFilter: predictShallowFilter,
        });
      }

      const option = {
        where: condition,
        order: [['id', 'DESC']],
        limit: perPage,
        offset: perPage * page - perPage,
      };
      const {count, rows} = await OfficerNewTests.findAndCountAll(option);
      const data = rows;

      if (data) {
        serviceResult.code = 200;
        serviceResult.success = true;
        serviceResult.data = data.map((item) => officerTestSerializer.new(item));
        serviceResult.totalPages = Math.ceil(count / perPage);
      } else {
        serviceResult.code = 400;
        serviceResult.success = false;
        serviceResult.error = 'Some error occurred while retrieving tests.';
      }
    } catch (error) {
      exceptionUtil.handlerErrorAPI(res, serviceResult, error);
    } finally {
      res.json(serviceResult);
    }
  },

  findOne: async (req, res) => {
    let serviceResult = resultUtil.new();
    try {
      const id = req.params.id;
      const data = await OfficerNewTests.findByPk(id);
      const test = await Test.findByPk(data.testVersion);
      const comments = await Comment.findAll({where: {officerId: id}});
      const commentResponses = comments.map((item) => commentSerializer.new(item));

      if (data) {
        serviceResult.code = 200;
        serviceResult.success = true;
        serviceResult.data = officerTestSerializer.new(data, test, commentResponses);
      } else {
        serviceResult.code = 404;
        serviceResult.success = false;
        serviceResult.error = 'Error retrieving Officer Test with id=' + id;
      }
    } catch (error) {
      exceptionUtil.handlerErrorAPI(res, serviceResult, error);
    } finally {
      res.json(serviceResult);
    }
  },
};

module.exports = officerTestController;
