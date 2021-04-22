const {Predict} = require('../../database/models');

module.exports = {
  createPredict: async (predictParam) => {
    let saveResult = false;
    if (predictParam && predictParam.officerTestId) {
      const builder = Predict.build(predictParam);
      saveResult = await builder.save();
    }
    return saveResult;
  },

  updatePredict: async (predictParam) => {
    let result = false;
    if (predictParam && predictParam.id) {
      const predictModel = await Predict.findByPk(predictParam.id);
      if (predictModel) {
        const {officerTestId, predict, conflict} = predictParam;
        const saveParam = {officerTestId: officerTestId, predict: predict, conflict: conflict};
        result = await predictModel.update(saveParam);
      }
    }
    return result;
  },

  deletePredict: async (id) => {
    let deleteResult = false;
    if (id) {
      const deleteModel = await Predict.findByPk(id);
      if (deleteModel) {
        deleteResult = await deleteModel.destroy();
      }
    }
    return deleteResult;
  },

  findOnePredict: async (id) => {
    return await Predict.findByPk(id);
  },

  findByConditionPredict: async ({predict}) => {
    if (predict) {
      return await Predict.findAll({where: {predict: predict}, order: [['id', 'DESC']]});
    }
  },
};
