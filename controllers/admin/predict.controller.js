const predictServices = require('../../services/admin/predict.service');

const resultUtil = require('../../servicehelper/service.result');

module.exports = {
  createPredict: async (req, res) => {
    const serviceResult = resultUtil.new();
    try {
      const result = await predictServices.createPredict(req.body);
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
  updatePredict: async (req, res) => {
    const serviceResult = resultUtil.new();
    try {
      const result = await predictServices.updatePredict(req.body);
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
  deletePredict: async (req, res) => {
    const serviceResult = resultUtil.new();
    try {
      const result = await predictServices.deletePredict(req.params.id);
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
  findOnePredict: async (req, res) => {
    const serviceResult = resultUtil.new();
    try {
      const result = await predictServices.findOnePredict(req.params.id);
      resultUtil.onSuccess(serviceResult, result);
    } catch (error) {
      resultUtil.onException(res, serviceResult, error);
    } finally {
      res.json(serviceResult);
    }
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
