const jwt = require('jsonwebtoken');
const db = require('../../database/models');
const commentSerializer = require('../../serializers/comment.serializer');
const resultUtil = require('../../servicehelper/service.result');
const exceptionUtil = require('../../handler_error/exceptionUtil');
const appSetting = require('../../appconfig/app.config');

const Comment = db.Comment;

const commentController = {
  create: async (req, res) => {
    let serviceResult = resultUtil.new();
    try {
      const token = req.headers[appSetting.authKey];
      const decode = jwt.verify(token, appSetting.jwtConfig.secretKey);
      const user = {
        email: decode.email,
        fullName: decode.name,
        id: decode.id,
        role: decode.role,
      }

      const comment = req.body;
      comment.userId = user.id;
      comment.user = JSON.stringify(user);
      const builderData = Comment.build(comment);
      const data = await builderData.save();

      if (data) {
        serviceResult.code = 200;
        serviceResult.success = true;
        serviceResult.data = commentSerializer.new(data);
      } else {
        serviceResult.code = 400;
        serviceResult.success = false;
        serviceResult.error = 'Some error occurred while creating the comment.';
      }
    } catch (error) {
      exceptionUtil.handlerErrorAPI(res, serviceResult, error);
    } finally {
      res.json(serviceResult);
    }
  },

  update: async (req, res) => {
    let serviceResult = resultUtil.new();
    try {
      const token = req.headers[appSetting.authKey];
      const decode = jwt.verify(token, appSetting.jwtConfig.secretKey);
      
      const id = req.params.id;

      const comment = await Comment.findByPk(id)
      if (decode.role != 'admin' && +comment.userId != +decode.id) {
        serviceResult.code = 401;
        serviceResult.success = false;
        serviceResult.error = 'Do not have permission';
      } else {
        const updateParams = {
          comment: req.body.comment,
        };
        const [flag] = await Comment.update(updateParams, {where: { id: id }, validate: false});
        const data = await Comment.findByPk(id);
        if (flag == 1) {
          serviceResult.code = 200;
          serviceResult.success = true;
          serviceResult.data = commentSerializer.new(comment);
        } else {
          serviceResult.code = 400;
          serviceResult.success = false;
          serviceResult.error = 'Error updating Comment with id=' + id;
        }
      }
    } catch (error) {
      exceptionUtil.handlerErrorAPI(res, serviceResult, error);
    } finally {
      res.json(serviceResult);
    }
  },
};

module.exports = commentController;
