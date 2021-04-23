const db = require('../../database/models');
const predictServices = require('../../services/admin/predict.service');
const predictSerializer = require('../../serializers/predict.serializer');
const resultUtil = require('../../servicehelper/service.result');
const {ErrorMessage} = require('../../helpers/constant');
const jwt = require('jsonwebtoken');
const appSetting = require('../../appconfig/app.config');
// const secretToken = require('../../appsetting.json');

const User = db.User;
const OfficerNewTests = db.OfficerNewTests;

module.exports = {
  createPredict: async (req, res) => {
    if (
      req.body.userId === undefined ||
      req.body.officerTestId === undefined ||
      req.body.predict === undefined ||
      req.body.diagnosis === undefined
    ) {
      return res.status(400).json({
        success: false,
        error: ErrorMessage.INFORMATIONS_IS_NOT_ENOUGH,
      });
    }

    const isExist = await User.findOne({where: {id: req.body.userId}});
    if (!isExist) {
      return res.status(400).json({
        success: false,
        error: 'User id is not match.',
      });
    }

    const isExistOfficerTest = await OfficerNewTests.findOne({where: {id: req.body.officerTestId}});
    if (!isExistOfficerTest) {
      return res.status(400).json({
        success: false,
        error: 'Officer test id is not match.',
      });
    }

    const result = await predictServices.createPredict(req.body);
    if (!result) {
      return res.status(404).json({
        success: false,
        error: ErrorMessage.CREATE_PREDICT_IS_NOT_SUCCESS,
      });
    }
    try {
      await OfficerNewTests.update(
        {
          doctorPredict: result.predict,
          doctorPredictDiagnosis: result.diagnosis,
          predict_id: result.id,
        },
        {
          where: {id: req.body.officerTestId},
        },
      );
    } catch (error) {
      console.log(error);
    }

    return res.status(201).json({
      success: true,
      data: predictSerializer.new(result),
    });
  },

  // update predict and update officer test
  updatePredict: async (req, res) => {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        error: 'Id is not match.',
      });
    }

    const isExist = await predictServices.findOnePredict(req.params.id);
    if (!isExist) {
      return res.status(400).json({
        success: false,
        error: 'Predict id is not match.',
      });
    }
    const token = req.headers[appSetting.authKey];
    const decode = jwt.verify(token, appSetting.jwtConfig.secretKey);
    const userId = decode.id;
    if (decode.role !== 'admin') {
      if (isExist.userId !== userId) {
        return res.status(403).json({
          success: false,
          error: 'permission denied.',
        });
      }
    }

    const result = await predictServices.updatePredict(req.params.id, req.body);
    if (!result) {
      return res.status(404).json({
        success: false,
        error: 'Update predict is failed.',
      });
    }

    try {
      const officerTest = await OfficerNewTests.findOne({where: {predict_id: req.params.id}});

      if (officerTest) {
        await OfficerNewTests.update(
          {
            doctorPredict: result.predict,
            doctorPredictDiagnosis: result.diagnosis,
            predict_id: result.id,
          },
          {
            where: {predict_id: req.params.id},
          },
        );
      }
    } catch (error) {
      console.log(error);
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  },
  deletePredict: async (req, res) => {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        error: 'Id is not match.',
      });
    }

    const isExist = await predictServices.findOnePredict(req.params.id);
    if (!isExist) {
      return res.status(400).json({
        success: false,
        error: 'Predict id is not match.',
      });
    }

    const token = req.headers[appSetting.authKey];
    const decode = jwt.verify(token, appSetting.jwtConfig.secretKey);
    const userId = decode.id;

    if (decode.role !== 'admin') {
      if (isExist.userId !== userId) {
        return res.status(403).json({
          success: false,
          error: 'permission denied.',
        });
      }
    }

    const result = await predictServices.deletePredict(req.params.id);
    if (!result) {
      return res.status(404).json({
        success: false,
        error: 'Delete predict is failed.',
      });
    }

    try {
      const officerTest = await OfficerNewTests.findOne({where: {predict_id: req.params.id}});

      if (officerTest) {
        const newPredict = await predictServices.findPredictMaxDate(officerTest.id);

        if (newPredict) {
          await OfficerNewTests.update(
            {
              doctorPredict: predictSerializer.new(newPredict[0]).predict,
              doctorPredictDiagnosis: predictSerializer.new(newPredict[0]).diagnosis,
              predict_id: predictSerializer.new(newPredict[0]).id,
            },
            {
              where: {predict_id: req.params.id},
            },
          );
        }

        await OfficerNewTests.update(
          {
            doctorPredict: null,
            doctorPredictDiagnosis: null,
            predict_id: null,
          },
          {
            where: {predict_id: req.params.id},
          },
        );
      }
    } catch (error) {
      console.log(error);
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  },
  findPredictOnOfficerTest: async (req, res) => {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        error: 'Id is not match.',
      });
    }

    const isExist = await OfficerNewTests.findOne({where: {id: req.params.id}});
    if (!isExist) {
      return res.status(400).json({
        success: false,
        error: 'Officer test id is not match.',
      });
    }

    const result = await predictServices.findAllPredictOnOfficerTest(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        error: 'Predict is not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: result.map((item) => predictSerializer.new(item)),
    });
  },
  findAllPredict: async (req, res) => {
    const serviceResult = resultUtil.new();
    try {
      const result = await predictServices.findByConditionPredict(req.query);
      if (result) {
        resultUtil.onSuccess(serviceResult, result);
      } else {
        resultUtil.onError(serviceResult, result);
      }
    } catch (error) {
      resultUtil.onException(res, serviceResult, error);
    } finally {
      res.json(serviceResult);
    }
  },
};
