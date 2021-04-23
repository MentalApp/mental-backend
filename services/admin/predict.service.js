const {Predict} = require('../../database/models');
const {Sequelize} = require('sequelize');

module.exports = {
  createPredict: async (predict) => {
    const builder = Predict.build(predict);
    const saveResult = await builder.save();
    return saveResult;
  },

  updatePredict: async (id, predictParam) => {
    const {officerTestId, predict, nameUser, diagnosis, conflict, userId} = predictParam;
    const predictModel = await Predict.findByPk(id);
    if (predictModel) {
      const saveParam = {
        ...(officerTestId && {officerTestId: officerTestId}),
        ...(predict && {predict: predict}),
        ...(diagnosis && {diagnosis: diagnosis}),
        ...(conflict && {conflict: conflict}),
        ...(nameUser && {nameUser: nameUser}),
        ...(userId && {userId: userId}),
      };
      return await predictModel.update(saveParam);
    }
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

  findPredictMaxDate: async (id) => {
    return await Predict.findAll({
      where: {officerTestId: id},
      order: [['id', 'DESC']],
      limit: 1,
    });
  },
  //order: [Sequelize.fn('max', Sequelize.col('updatedAt'))],

  findAllPredictOnOfficerTest: async (id) => {
    return await Predict.findAll({where: {officerTestId: id}});
  },

  findByConditionPredict: async ({predict}) => {
    if (predict) {
      return await Predict.findAll({where: {predict: predict}, order: [['id', 'DESC']]});
    }
  },
};
