module.exports = (app) => {
  const officerTests = require('../../controllers/admin/predict.controller');
  const {authMidleRole} = require('../../middlewares/auth.middleware');

  var router = require('express').Router();

  router.get('/', officerTests.findAllPredict);
  router.get('/:id', officerTests.findPredictOnOfficerTest);
  router.post('', officerTests.createPredict);
  router.put('/:id', officerTests.updatePredict);
  router.delete('/:id', officerTests.deletePredict);

  app.use('/api/admin/predicts', authMidleRole, router);
};
