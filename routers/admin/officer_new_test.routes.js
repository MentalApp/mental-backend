module.exports = (app) => {
  const officerNewTests = require('../../controllers/admin/officer_new_test.controller.js');
  const {authMidleRole} = require('../../middlewares/auth.middleware');

  var router = require('express').Router();

  router.get('/', officerNewTests.findAll);
  router.get('/:id', officerNewTests.findOne);

  app.use('/api/admin/officer_new_tests', authMidleRole, router);
};
