module.exports = (app) => {
  const tests = require('../../controllers/guest/test.controller.js');
  const authMiddleware = require('../../middlewares/auth.middleware');

  var router = require('express').Router();

  router.get('/', tests.findAllTestPool);

  app.use('/api/guest/tests', authMiddleware.authGuest, router);
};
