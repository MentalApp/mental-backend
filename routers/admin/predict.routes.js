module.exports = (app) => {
  const officerTests = require('../../controllers/admin/predict.controller');
  const {authMidleRole} = require('../../middlewares/auth.middleware');

  var router = require('express').Router();

  router.get('/', officerTests.findAllPredict);
  router.get('/:id', officerTests.findOnePredict);
  router.post('', officerTests.createPredict);
  router.put('', officerTests.updatePredict);
  router.delete('/:id', officerTests.deletePredict);


  app.use('/api/admin/predicts',authMidleRole, router);
};