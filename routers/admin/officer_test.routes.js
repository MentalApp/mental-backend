module.exports = (app) => {
  const officerTests = require('../../controllers/admin/officer_test.controller.js');
  const {authMidleRole} = require('../../middlewares/auth.middleware');

  var router = require('express').Router();

  router.get('/', officerTests.findAll);
  router.get('/:id', officerTests.findOne);

  app.use('/api/admin/officer_tests', authMidleRole, router);
};
